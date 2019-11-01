"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright 2019 Next Century Corporation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var config_option_1 = require("../models/config-option");
var filters_1 = require("../models/filters");
var FilterService = /** @class */ (function () {
    function FilterService() {
        this.filterCollection = new filters_1.FilterCollection();
        this._listeners = new Map();
        this._cachedFilters = new Map();
        this._notifier = this.notifyFilterChangeListeners.bind(this);
    }
    /**
     * Creates new filters and their relation filters using the given filter configs and adds them to the global filter collection.
     */
    FilterService.prototype.createFilters = function (callerId, filterDesigns, dataset) {
        var _this = this;
        var intermediaryCollection = this._createFiltersAndRelations(filterDesigns, dataset);
        // Loop over the data sources of the complete filter collection to delete the old relation filters in each data source.
        this.filterCollection.getDataSources().forEach(function (filterDataSourceList) {
            var previousFilters = _this.filterCollection.getFilters(filterDataSourceList);
            var newFilters = intermediaryCollection.getFilters(filterDataSourceList);
            var modifiedFilters = previousFilters.concat(newFilters);
            _this.filterCollection.setFilters(filterDataSourceList, modifiedFilters);
        });
        if (filterDesigns.length) {
            this._notifier(callerId);
        }
    };
    /**
     * Deletes the filter from the global filter collection matching the given filter config and all its relation filters.
     */
    FilterService.prototype.deleteFilter = function (callerId, filterDesignToDelete, savePreviousFilters) {
        if (savePreviousFilters === void 0) { savePreviousFilters = false; }
        var filterDataSourceList = this.filterCollection.findFilterDataSources(filterDesignToDelete);
        var filterIdsToDelete = filterDesignToDelete.id ? this._findFilterIdsAndRelationIdsWithId(filterDataSourceList, filterDesignToDelete) : this._findFilterIdsAndRelationIds(filterDataSourceList);
        return this._deleteFilterIds(callerId, filterIdsToDelete, savePreviousFilters);
    };
    /**
     * Deletes the filters from the global filter collection matching the given filter configs and all their relation filters (or all the
     * filters if no filter configs are given).
     */
    FilterService.prototype.deleteFilters = function (callerId, filterDesignsToDelete, savePreviousFilters) {
        if (filterDesignsToDelete === void 0) { filterDesignsToDelete = []; }
        if (savePreviousFilters === void 0) { savePreviousFilters = false; }
        var filterIdsToDelete = filterDesignsToDelete.length ? this._findFilterIdsAndRelationIdsInConfigs(filterDesignsToDelete) :
            this._findFilterIdsAndRelationIdsInDataSources(this.filterCollection.getDataSources());
        return this._deleteFilterIds(callerId, filterIdsToDelete, savePreviousFilters);
    };
    /**
     * Exchanges all the filters in the global filter collection with data sources matching the given filter configs for new filters
     * created from the given filter configs. If filterDesignsToDelete is given, also deletes all the filters in the global filter
     * collection with data sources matching the filterDesignsToDelete (useful if you want to both delete and exchange with one event).
     */
    FilterService.prototype.exchangeFilters = function (callerId, filterDesigns, dataset, filterDesignsToDelete, keepSameFilters, applyPreviousFilter) {
        var _this = this;
        if (filterDesignsToDelete === void 0) { filterDesignsToDelete = []; }
        if (keepSameFilters === void 0) { keepSameFilters = false; }
        if (applyPreviousFilter === void 0) { applyPreviousFilter = false; }
        var intermediaryCollection = this._createFiltersAndRelations(filterDesigns, dataset);
        // Find the IDs of all the filters and their relation filters to delete in the exchange.
        var filterIdsToDelete = this._findFilterIdsAndRelationIdsInDataSources(intermediaryCollection.getDataSources());
        if (filterDesignsToDelete.length) {
            // Append the IDs of all the additional filters and their relations filters to delete.  Repeat IDs don't matter.
            filterIdsToDelete = filterIdsToDelete.concat(this._findFilterIdsAndRelationIdsInConfigs(filterDesignsToDelete));
        }
        // Loop over the data sources of the complete filter collection to delete the old relation filters in each data source.
        this.filterCollection.getDataSources().forEach(function (filterDataSourceList) {
            var previousFilters = _this.filterCollection.getFilters(filterDataSourceList);
            var modifiedFilters = intermediaryCollection.getFilters(filterDataSourceList);
            // If this data source does not have exchanges, remove any old relation filters but keep the rest of the filters.
            if (!modifiedFilters.length) {
                modifiedFilters = previousFilters.filter(function (filter) { return filterIdsToDelete.indexOf(filter.id) < 0; });
            }
            else {
                // If each filter in the new ("modified") list is the same as each filter in the old ("previous") list, just remove them.
                if (!keepSameFilters && modifiedFilters.length === previousFilters.length &&
                    modifiedFilters.every(function (modifiedFilter, index) { return modifiedFilter.isEquivalentToFilter(previousFilters[index]); })) {
                    modifiedFilters = [];
                }
                if (applyPreviousFilter) {
                    modifiedFilters = _this._saveOrRetrievePreviousFilters(callerId, filterDataSourceList, previousFilters, modifiedFilters);
                }
            }
            _this.filterCollection.setFilters(filterDataSourceList, modifiedFilters);
        });
        if (filterDesigns.length || filterDesignsToDelete.length) {
            this._notifier(callerId);
        }
    };
    /**
     * Returns the filters for the given data sources, or all the filters if no data sources are given.
     */
    FilterService.prototype.getFilters = function (filterDataSourceList) {
        if (filterDataSourceList) {
            return this.filterCollection.getFilters(filterDataSourceList);
        }
        return this.filterCollection.getFilters();
    };
    /**
     * Returns all the filters to search on the given datastore/database/table (ignoring filters from the given data sources).
     *
     * @arg {string} datastoreName
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {AbstractFilterDesign[]} [filterDesignListToIgnore=[]]
     * @return {AbstractFilter[]}
     */
    FilterService.prototype.getFiltersToSearch = function (datastoreName, databaseName, tableName, filterDesignListToIgnore) {
        var _this = this;
        if (filterDesignListToIgnore === void 0) { filterDesignListToIgnore = []; }
        return this.filterCollection.getDataSources().reduce(function (returnList, filterDataSourceList) {
            var ignore = filterDesignListToIgnore.some(function (filterDesignToIgnore) {
                var filterDataSourceListToIgnore = _this.filterCollection.findFilterDataSources(filterDesignToIgnore);
                return filters_1.FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, filterDataSourceListToIgnore);
            });
            if (ignore) {
                return returnList;
            }
            var filterList = _this.filterCollection.getFilters(filterDataSourceList).filter(function (filter) {
                return filter.doesAffectSearch(datastoreName, databaseName, tableName);
            });
            // Assign a dummy ID because we won't need it here.
            var filter = filterList.length ? new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, filterList, '_') : null;
            return returnList.concat(filter || []);
        }, []);
    };
    /**
     * Notifies all the filter-change listeners using the given caller ID and change collection.
     */
    FilterService.prototype.notifyFilterChangeListeners = function (callerId) {
        for (var _i = 0, _a = Array.from(this._listeners.values()); _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(callerId);
        }
    };
    /**
     * Overrides the notifier of filter-change listeners with the given callback function.
     */
    FilterService.prototype.overrideFilterChangeNotifier = function (notifier) {
        if (notifier) {
            this._notifier = notifier;
        }
    };
    /**
     * Registers the given ID with the given filter-change listener callback function.
     */
    FilterService.prototype.registerFilterChangeListener = function (id, listener) {
        this._listeners.set(id, listener);
    };
    /**
     * Returns the filters from the global filter collection that are compatible (matching) the given filter configs.
     */
    FilterService.prototype.retrieveCompatibleFilterCollection = function (filterDesignList) {
        var compatibleCollection = new filters_1.FilterCollection();
        for (var _i = 0, filterDesignList_1 = filterDesignList; _i < filterDesignList_1.length; _i++) {
            var filterDesign = filterDesignList_1[_i];
            // Find the data source for the filter config.
            var filterDataSourceList = compatibleCollection.findFilterDataSources(filterDesign);
            // Find the global filter list that is compatible with the filter config.
            var filterList = this.filterCollection.getFilters(this.filterCollection.findFilterDataSources(filterDesign));
            // Add the new filters to the existing list from the collection, but don't add the same filter twice.
            var compatibleFilterList = filterList.reduce(function (list, nextFilter) {
                return list.concat((list.indexOf(nextFilter) < 0 ? nextFilter : []));
            }, compatibleCollection.getFilters(filterDataSourceList));
            compatibleCollection.setFilters(filterDataSourceList, compatibleFilterList);
        }
        return compatibleCollection;
    };
    /**
     * Sets the filters in the FilterService to the given filters.
     */
    FilterService.prototype.setFilters = function (filters) {
        var collection = new filters_1.FilterCollection();
        for (var _i = 0, filters_2 = filters; _i < filters_2.length; _i++) {
            var filter = filters_2[_i];
            var filterDataSourceList = collection.findFilterDataSources(filter.toDesign());
            collection.setFilters(filterDataSourceList, collection.getFilters(filterDataSourceList).concat(filter));
        }
        this.filterCollection = collection;
    };
    /**
     * Unregisters the given ID of a registered filter-change listener.
     */
    FilterService.prototype.unregisterFilterChangeListener = function (id) {
        this._listeners.delete(id);
    };
    FilterService.prototype._createFiltersAndRelations = function (filterDesigns, dataset) {
        var _this = this;
        var intermediaryCollection = new filters_1.FilterCollection();
        filterDesigns.forEach(function (filterDesign) {
            // Create the new filters and new relation filters.
            var newFilter = filterDesign.toFilter();
            var newRelationFilters = newFilter.createRelationFilterList(dataset);
            // Save the new filters and new relation filters in a filter collection to separate the filters by unique data source.
            [newFilter].concat(newRelationFilters).forEach(function (filter) {
                var filterDataSourceList = _this.filterCollection.findFilterDataSources(filter.toDesign());
                var filters = intermediaryCollection.getFilters(filterDataSourceList);
                intermediaryCollection.setFilters(filterDataSourceList, filters.concat(filter));
            });
        });
        return intermediaryCollection;
    };
    FilterService.prototype._deleteFilterIds = function (callerId, filterIdsToDelete, savePreviousFilters) {
        var _this = this;
        // Loop over the data sources of the complete filter collection to delete the old relation filters in each data source.
        this.filterCollection.getDataSources().forEach(function (filterDataSourceList) {
            var previousFilters = _this.filterCollection.getFilters(filterDataSourceList);
            var modifiedFilters = previousFilters.filter(function (filter) { return filterIdsToDelete.indexOf(filter.id) < 0; });
            if (savePreviousFilters) {
                modifiedFilters = _this._saveOrRetrievePreviousFilters(callerId, filterDataSourceList, previousFilters, modifiedFilters);
            }
            _this.filterCollection.setFilters(filterDataSourceList, modifiedFilters);
        });
        if (filterIdsToDelete.length) {
            this._notifier(callerId);
        }
    };
    /**
     * Returns all the filter IDs and the relation filter IDs in the global filter collection with the given data source.
     */
    FilterService.prototype._findFilterIdsAndRelationIds = function (filterDataSourceList) {
        return this._findFilterIdsAndRelationIdsInFilters(this.filterCollection.getFilters(filterDataSourceList));
    };
    /**
     * Returns all the filter IDs and the relation filter IDs in the global filter collection with the data sources matching one of the
     * given filter configs.
     */
    FilterService.prototype._findFilterIdsAndRelationIdsInConfigs = function (filterDesigns) {
        var _this = this;
        return this._findFilterIdsAndRelationIdsInDataSources(filterDesigns.map(function (filterDesign) {
            return _this.filterCollection.findFilterDataSources(filterDesign);
        }));
    };
    /**
     * Returns all the filter IDs and the relation filter IDs in the global filter collection with one of the given data sources.
     */
    FilterService.prototype._findFilterIdsAndRelationIdsInDataSources = function (filterCollectionDataSources) {
        var _this = this;
        return filterCollectionDataSources.reduce(function (idList, filterDataSourceList) {
            return idList.concat(_this._findFilterIdsAndRelationIds(filterDataSourceList));
        }, []);
    };
    /**
     * Returns all the filter IDs and the relation filter IDs in the given filters.
     */
    FilterService.prototype._findFilterIdsAndRelationIdsInFilters = function (filters) {
        return filters.reduce(function (idList, filter) { return idList.concat(filter.id).concat(filter.relations); }, []);
    };
    /**
     * Returns the filter ID from the given data source in the global filter collection matching the ID in the given filter config and all
     * its relation filter IDs.
     */
    FilterService.prototype._findFilterIdsAndRelationIdsWithId = function (filterDataSourceList, filterDesign) {
        return this._findFilterIdsAndRelationIdsInFilters(this.filterCollection.getFilters(filterDataSourceList)
            .filter(function (filter) { return filter.id === filterDesign.id; }));
    };
    FilterService.prototype._saveOrRetrievePreviousFilters = function (callerId, filterDataSourceList, previousFilters, modifiedFilters) {
        if (!this._cachedFilters.get(callerId)) {
            this._cachedFilters.set(callerId, new Map());
        }
        // If modifiedFilters is empty, add any cached filters with an equivalent data-source-list to modifiedFilters.
        if (!modifiedFilters.length) {
            var cachedFilters_1 = [];
            var callerCachedFilters_1 = this._cachedFilters.get(callerId);
            callerCachedFilters_1.forEach(function (cachedFilter, cachedDataSourceList) {
                if (filters_1.FilterUtil.areFilterDataSourceListsEquivalent(cachedDataSourceList, filterDataSourceList)) {
                    cachedFilters_1 = cachedFilters_1.concat(cachedFilter);
                    // Remove the cached filters once they have been un-cached here.
                    callerCachedFilters_1.set(cachedDataSourceList, []);
                }
            });
            this._cachedFilters.set(callerId, callerCachedFilters_1);
            return cachedFilters_1;
        }
        this._cachedFilters.get(callerId).set(filterDataSourceList, previousFilters);
        return modifiedFilters;
    };
    return FilterService;
}());
exports.FilterService = FilterService;
//# sourceMappingURL=filter.service.js.map
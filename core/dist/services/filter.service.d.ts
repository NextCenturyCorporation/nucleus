import { Dataset } from '../models/dataset';
import { AbstractFilter, AbstractFilterDesign, FilterCollection, FilterDataSource } from '../models/filters';
export declare type FilterChangeListener = (callerId: string) => void;
export declare class FilterService {
    protected filterCollection: FilterCollection;
    private _listeners;
    private _notifier;
    private _cachedFilters;
    constructor();
    /**
     * Creates new filters and their relation filters using the given filter configs and adds them to the global filter collection.
     */
    createFilters(callerId: string, filterDesigns: AbstractFilterDesign[], dataset: Dataset): void;
    /**
     * Deletes the filter from the global filter collection matching the given filter config and all its relation filters.
     */
    deleteFilter(callerId: string, filterDesignToDelete: AbstractFilterDesign, savePreviousFilters?: boolean): void;
    /**
     * Deletes the filters from the global filter collection matching the given filter configs and all their relation filters (or all the
     * filters if no filter configs are given).
     */
    deleteFilters(callerId: string, filterDesignsToDelete?: AbstractFilterDesign[], savePreviousFilters?: boolean): void;
    /**
     * Exchanges all the filters in the global filter collection with data sources matching the given filter configs for new filters
     * created from the given filter configs. If filterDesignsToDelete is given, also deletes all the filters in the global filter
     * collection with data sources matching the filterDesignsToDelete (useful if you want to both delete and exchange with one event).
     */
    exchangeFilters(callerId: string, filterDesigns: AbstractFilterDesign[], dataset: Dataset, filterDesignsToDelete?: AbstractFilterDesign[], keepSameFilters?: boolean, applyPreviousFilter?: boolean): void;
    /**
     * Returns the filters for the given data sources, or all the filters if no data sources are given.
     */
    getFilters(filterDataSourceList?: FilterDataSource[]): AbstractFilter[];
    /**
     * Returns all the filters to search on the given datastore/database/table (ignoring filters from the given data sources).
     *
     * @arg {string} datastoreName
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {AbstractFilterDesign[]} [filterDesignListToIgnore=[]]
     * @return {AbstractFilter[]}
     */
    getFiltersToSearch(datastoreName: string, databaseName: string, tableName: string, filterDesignListToIgnore?: AbstractFilterDesign[]): AbstractFilter[];
    /**
     * Notifies all the filter-change listeners using the given caller ID and change collection.
     */
    notifyFilterChangeListeners(callerId: string): void;
    /**
     * Overrides the notifier of filter-change listeners with the given callback function.
     */
    overrideFilterChangeNotifier(notifier: FilterChangeListener): void;
    /**
     * Registers the given ID with the given filter-change listener callback function.
     */
    registerFilterChangeListener(id: string, listener: FilterChangeListener): void;
    /**
     * Returns the filters from the global filter collection that are compatible (matching) the given filter configs.
     */
    retrieveCompatibleFilterCollection(filterDesignList: AbstractFilterDesign[]): FilterCollection;
    /**
     * Sets the filters in the FilterService to the given filters.
     */
    setFilters(filters: AbstractFilter[]): void;
    /**
     * Unregisters the given ID of a registered filter-change listener.
     */
    unregisterFilterChangeListener(id: string): void;
    private _createFiltersAndRelations;
    private _deleteFilterIds;
    /**
     * Returns all the filter IDs and the relation filter IDs in the global filter collection with the given data source.
     */
    private _findFilterIdsAndRelationIds;
    /**
     * Returns all the filter IDs and the relation filter IDs in the global filter collection with the data sources matching one of the
     * given filter configs.
     */
    private _findFilterIdsAndRelationIdsInConfigs;
    /**
     * Returns all the filter IDs and the relation filter IDs in the global filter collection with one of the given data sources.
     */
    private _findFilterIdsAndRelationIdsInDataSources;
    /**
     * Returns all the filter IDs and the relation filter IDs in the given filters.
     */
    private _findFilterIdsAndRelationIdsInFilters;
    /**
     * Returns the filter ID from the given data source in the global filter collection matching the ID in the given filter config and all
     * its relation filter IDs.
     */
    private _findFilterIdsAndRelationIdsWithId;
    private _saveOrRetrievePreviousFilters;
}

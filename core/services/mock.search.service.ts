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
import { SearchService } from './search.service';
import { SearchObject } from './abstract.search.service';

export class SearchServiceMock extends SearchService {
    constructor() {
        super(null);
    }

    public canRunSearch(datastoreType: string, datastoreHost: string): boolean {
        return !!(datastoreType && datastoreHost);
    }

    public runSearch(
        __datastoreType: string,
        __datastoreHost: string,
        __searchObject: SearchObject,
        __onSuccess: (response: any) => void,
        __onError?: (response: any) => void
    ): XMLHttpRequest {
        return new XMLHttpRequest();
    }
}

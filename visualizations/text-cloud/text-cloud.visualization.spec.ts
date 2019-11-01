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

import { NextCenturyTextCloudVisualization } from './text-cloud.visualization';

describe('Text Cloud Visualization', () => {
    let color1 = 'rgb(0, 0, 255)';
    let color2 = 'rgb(11, 11, 96)';
    let color3 = 'rgb(17, 17, 17)';
    let textCloudVis: NextCenturyTextCloudVisualization;

    beforeEach(() => {
        textCloudVis = new NextCenturyTextCloudVisualization();
        textCloudVis.setAttribute('aggregation-field', 'testCounts');
        textCloudVis.setAttribute('text-field', 'testText');
    });

    it('changeFilteredText does redraw the text cloud', () => {
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        textCloudVis.changeFilteredText(['a']);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.changeFilteredText(['b']);

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text filtered');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.changeFilteredText(['a', 'b', 'c']);

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text filtered');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text filtered');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.changeFilteredText([]);

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('changeFilteredText does work with strings and nested arrays', () => {
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        textCloudVis.changeFilteredText('a');

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.changeFilteredText(['a', ['b', 'c']]);

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text filtered');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text filtered');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('changeFilteredText does not redraw the text cloud if filtered text is same', () => {
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let previousTextElements = textCloudVis.shadowRoot.querySelectorAll('.text');

        textCloudVis.changeFilteredText([]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(previousTextElements.item(0)).toEqual(textElements.item(0));
        expect(previousTextElements.item(1)).toEqual(textElements.item(1));
        expect(previousTextElements.item(2)).toEqual(textElements.item(2));
    });

    it('drawData does redraw the text cloud', () => {
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.style.color).toEqual(color1);
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.style.color).toEqual(color2);
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual(color3);
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('drawData does work with aggregation-label attribute', () => {
        textCloudVis.setAttribute('aggregation-label', 'Label');
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.style.color).toEqual(color1);
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('Label: 4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.style.color).toEqual(color2);
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('Label: 2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual(color3);
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('Label: 1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('drawData does work with enable-show-values attribute', () => {
        textCloudVis.setAttribute('enable-show-values', 'true');
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.style.color).toEqual(color1);
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        expect(elementA.querySelector('.value').innerHTML).toEqual('(4)');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.style.color).toEqual(color2);
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        expect(elementB.querySelector('.value').innerHTML).toEqual('(2)');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual(color3);
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
        expect(elementC.querySelector('.value').innerHTML).toEqual('(1)');
    });

    it('drawData does redraw the text cloud with previously filtered data', () => {
        textCloudVis.changeFilteredText(['a', 'b']);

        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.style.color).toEqual(color1);
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text filtered');
        expect(elementB.style.color).toEqual(color2);
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual(color3);
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('drawData does work with nested fields', () => {
        textCloudVis.setAttribute('aggregation-field', 'aggregations.testCounts');
        textCloudVis.setAttribute('text-field', 'fields.testText');
        textCloudVis.drawData([{
            aggregations: {
                testCounts: 4
            },
            fields: {
                testText: 'a'
            }
        }, {
            aggregations: {
                testCounts: 2
            },
            fields: {
                testText: 'b'
            }
        }, {
            aggregations: {
                testCounts: 1
            },
            fields: {
                testText: 'c'
            }
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.title).toEqual('4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.title).toEqual('2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.title).toEqual('1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('setAttribute does redraw the text cloud', () => {
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.style.color).toEqual(color1);
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.style.color).toEqual(color2);
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual(color3);
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.setAttribute('aggregation-label', 'Label');

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.style.color).toEqual(color1);
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('Label: 4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.style.color).toEqual(color2);
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('Label: 2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual(color3);
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('Label: 1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('toggleFilter does toggle filtered class on text element, redraw the text cloud, and emit filter events', (done) => {
        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let called = 0;
        textCloudVis.addEventListener('filter', (event: any) => {
            called++;
            if (called === 1) {
                expect(event.detail.values).toEqual(['a']);
            }
            if (called === 2) {
                expect(event.detail.values).toEqual(['a', 'b']);
            }
            if (called === 3) {
                expect(event.detail.values).toEqual(['b']);
            }
            if (called === 4) {
                expect(event.detail.values).toEqual([]);
                done();
            }
        });

        textCloudVis.toggleFilter('a');

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.toggleFilter('b');

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text filtered');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text filtered');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.toggleFilter('a');

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text filtered');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');

        textCloudVis.toggleFilter('b');

        textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });

    it('clicking text elements does call toggleFilter', () => {
        let spy = spyOn(textCloudVis, 'toggleFilter');

        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);

        (textElements.item(0) as HTMLElement).click();
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['a']);

        (textElements.item(1) as HTMLElement).click();
        expect(spy.calls.count()).toEqual(2);
        expect(spy.calls.argsFor(1)).toEqual(['b']);

        (textElements.item(2) as HTMLElement).click();
        expect(spy.calls.count()).toEqual(3);
        expect(spy.calls.argsFor(2)).toEqual(['c']);
    });

    it('color attributes affect text element colors', () => {
        textCloudVis.setAttribute('color-accent', '#ff0000');
        textCloudVis.setAttribute('color-text', '#110000');

        textCloudVis.drawData([{
            testCounts: 4,
            testText: 'a'
        }, {
            testCounts: 2,
            testText: 'b'
        }, {
            testCounts: 1,
            testText: 'c'
        }]);

        let textElements = textCloudVis.shadowRoot.querySelectorAll('.text');
        expect(textElements.length).toEqual(3);
        let elementA = textElements.item(0) as HTMLElement;
        expect(elementA.className).toEqual('text');
        expect(elementA.style.color).toEqual('rgb(255, 0, 0)');
        expect(elementA.style['font-size']).toEqual('140%');
        expect(elementA.title).toEqual('4');
        expect(elementA.querySelector('.key').innerHTML).toEqual('a');
        let elementB = textElements.item(1) as HTMLElement;
        expect(elementB.className).toEqual('text');
        expect(elementB.style.color).toEqual('rgb(96, 0, 0)');
        expect(elementB.style['font-size']).toEqual('100%');
        expect(elementB.title).toEqual('2');
        expect(elementB.querySelector('.key').innerHTML).toEqual('b');
        let elementC = textElements.item(2) as HTMLElement;
        expect(elementC.className).toEqual('text');
        expect(elementC.style.color).toEqual('rgb(17, 0, 0)');
        expect(elementC.style['font-size']).toEqual('80%');
        expect(elementC.title).toEqual('1');
        expect(elementC.querySelector('.key').innerHTML).toEqual('c');
    });
});


import React, { Component } from 'react';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

import GridItem from 'Components/grid/GridItem';
import InfoItem from 'Components/grid/InfoItem';
import { Container } from 'Components/layout';

export default class GridPage extends Component {
  getLayoutsConfig = () => ({
    xxs: [
      { i: 'a', x: 0, y: 0, w: 8, h: 8 },
      { i: 'b', x: 7, y: 0, w: 4, h: 2 },
      { i: 'c', x: 7, y: 3, w: 4, h: 2 }
    ],
    xs: [
      { i: 'a', x: 0, y: 0, w: 8, h: 4 },
      { i: 'b', x: 7, y: 0, w: 4, h: 2 },
      { i: 'c', x: 7, y: 3, w: 4, h: 2 }
    ],
    md: [
      { i: 'a', x: 0, y: 0, w: 8, h: 8 },
      { i: 'b', x: 9, y: 0, w: 4, h: 2 },
      { i: 'c', x: 9, y: 3, w: 4, h: 2 }
    ],
  });

  render() {
    return (
      <article className="grid-page">
        <Container>
          <ResponsiveReactGridLayout
            className="layout"
            layouts={this.getLayoutsConfig()}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{
              xxs: 12,
              xs: 12,
              md: 12,
              lg: 12
            }}
            rowHeight={10}
          >
            <GridItem key="a">
              <InfoItem />
            </GridItem>
            <GridItem key="b">
              <InfoItem />
            </GridItem>
            <GridItem key="c">
              <InfoItem />
            </GridItem>
          </ResponsiveReactGridLayout>
        </Container>
      </article>
    );
  }
}

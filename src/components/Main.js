import React from 'react';

import Header from './common/Header';

const Main = (props) => {
    return (
        <div>
            <Header />
            <main className="main-content">
                {props.children}
            </main>
        </div>
    )
};

export default Main;

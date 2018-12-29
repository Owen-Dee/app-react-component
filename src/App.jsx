import React, { Component } from 'react';
import styles from './App.module.scss';
import { Button, Modal, Input, Upload, Icon } from 'antd';
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.App}>
                <Button>Roll up</Button>
                <Input placeholder="component-name" />
                <Icon type="step-forward" />
            </div >
        );
    }
}

export default App;

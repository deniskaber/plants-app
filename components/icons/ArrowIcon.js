import {Svg} from 'expo';
import React, {Component} from 'react';
import {View} from 'react-native';

export default class ArrowIcon extends Component {
    render() {
        const {fill} = this.props;

        return (
            <View>
                <Svg viewBox="0 0 512 512">
                    <Svg.Path
                        fill={fill}
                        fillRule="nonzero"
                        d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"
                    />
                </Svg>
            </View>
        );
    }
}

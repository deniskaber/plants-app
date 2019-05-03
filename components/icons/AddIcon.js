import {Svg} from 'expo';
import React, {Component} from 'react';
import {View} from 'react-native';

export default class AddIcon extends Component {
    render() {
        const {fill} = this.props;

        return (
            <View>
                <Svg height={24} width={24}>
                    <Svg.Path
                        fill={fill}
                        fillRule="nonzero"
                        d="M24 14H14v10h-4V14H0v-4h10V0h4v10h10z"
                    />
                </Svg>
            </View>
        );
    }
}

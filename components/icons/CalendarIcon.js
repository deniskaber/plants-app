import {Svg} from 'expo';
import React, {Component} from 'react';
import {View} from 'react-native';

export default class CalendarIcon extends Component {
    render() {
        const {fill} = this.props;

        return (
            <View>
                <Svg height={32} width={32}>
                    <Svg.Path
                        fill={fill}
                        fillRule="nonzero"
                        d="M7.138 0a1 1 0 0 0-1 1v2.001H2.668L0 3v2h6.139v2c0 .582.401 1 1 1 .597 0 1-.395 1-1V5H15v2c0 .69.527 1 1 1s1-.299 1-1V5h6v2c0 .544.357 1 1 1s1-.435 1-1V5h7V3l-2.666.001H25v-2a1 1 0 1 0-2 0v2h-6v-2a1 1 0 1 0-2 0v2H8.137v-2a1 1 0 0 0-1-1.001zm-1 30.001H2.668L0 30v2h32v-2l-2.666.001H6.138zm.862-18v3h4v-3H7zm7 0v3h4v-3h-4zm7 0v3h4v-3h-4zM7 17v3h4v-3H7zm7 0v3h4v-3h-4zm7 0v3h4v-3h-4zM7 22v3h4v-3H7zm7 0v3h4v-3h-4zm7 0v3h4v-3h-4z"
                    />
                </Svg>
            </View>
        );
    }
}

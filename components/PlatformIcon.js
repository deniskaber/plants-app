import React from 'react';
import {Platform} from 'react-native';
import {Icon} from 'expo';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class PlatformIcon extends React.Component {
    static propTypes = Icon.Ionicons.propTypes;

    static defaultProps = {
        color: Colors.textColor,
        size: Layout.titleFontSize,
    };

    getIconName = (name) => {
        return Platform.OS === 'ios' ? 'ios-' + name : 'md-' + name;
    };

    render() {
        const {name, ...restProps} = this.props;
        return <Icon.Ionicons {...restProps} name={this.getIconName(name)} />;
    }
}

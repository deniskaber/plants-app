import {Svg} from 'expo';
import React, {Component} from 'react';
import {View} from 'react-native';

export default class CameraIcon extends Component {
    render() {
        const {fill, style} = this.props;

        return (
            <View style={style}>
                <Svg height={32} width={32}>
                    <Svg.Path
                        fill={fill}
                        fillRule="nonzero"
                        d="M12.098 3L9.813 5.286H0v22.857h32V5.286h-9.813L19.902 3h-7.804zM16 9.857c3.774 0 6.857 3.084 6.857 6.857 0 3.774-3.083 6.857-6.857 6.857s-6.857-3.083-6.857-6.857c0-3.773 3.083-6.857 6.857-6.857zm8 0h3.429v2.286H24V9.857z"
                    />
                </Svg>
            </View>
        );
    }
}

/**
 *  Container.js
 * Created by Emre KACAN (emrekacan@gmail.com)
 * on 9.06.2018.
 */

import React from 'react';
import {View, Dimensions} from "react-native";

const {height, width} = Dimensions.get('window');

class Container extends React.Component {
    render() {
        return (
            <View style={{
                width:width,
                alignItems:'center'
            }}>
                <View style={{
                    width:width*0.9,
                    marginLeft:30,
                    marginRight:30,
                    marginTop:30,
                    marginBottom:30
                }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default Container;
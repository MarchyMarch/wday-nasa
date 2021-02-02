import React from 'react';
import {Tabs} from '@workday/canvas-kit-labs-react-tabs';
import {spacing} from '@workday/canvas-kit-react-core';
import {DailyPhoto} from './DailyPhoto';
import {MarsRoverPhotos} from './MarsRoverPhotos';
import {Mosaics} from './Mosaics';
import './TabNavigation.scss';

export class TabNavigation extends React.Component{
    render(){
        return(
            <Tabs id="tab-container">
                <Tabs.List>
                    <Tabs.Item>APOD</Tabs.Item>
                    <Tabs.Item>Mars Rover Photos</Tabs.Item>
                    <Tabs.Item>Mosaics</Tabs.Item>
                </Tabs.List>
                <div style={{marginTop: spacing.xxxs}}>
                    <Tabs.Panel><DailyPhoto/></Tabs.Panel>
                    <Tabs.Panel><MarsRoverPhotos/></Tabs.Panel>
                    <Tabs.Panel><Mosaics/></Tabs.Panel>
                </div>
            </Tabs>
        )
    }
}
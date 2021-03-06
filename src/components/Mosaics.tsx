import React from 'react';
import {PageHeader} from '@workday/canvas-kit-react-page-header';
import {IconButton} from '@workday/canvas-kit-react-button';
import {exportIcon, fullscreenIcon} from '@workday/canvas-system-icons-web';

export class Mosaics extends React.Component{
    render(): React.ReactNode{
        return(
            <PageHeader title="Mosaics">
                <IconButton icon={exportIcon} aria-label="export"/>
                <IconButton icon={fullscreenIcon} aria-label="fullscreen"/>
            </PageHeader>
        )
    }
}
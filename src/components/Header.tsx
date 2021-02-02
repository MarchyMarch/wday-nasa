import React from 'react';
import {Header, HeaderVariant} from '@workday/canvas-kit-labs-react-header';
import {IconButton, Avatar, Button, IconButtonVariant} from '@workday/canvas-kit-react';
import {notificationsIcon} from '@workday/canvas-system-icons-web';

export class HeaderBar extends React.Component{
    render(){
        return(
            <Header title="WDAYxNASA" brandUrl="#" variant={HeaderVariant.Dub}>
                <nav>
                    <ul>
                        <li className="current"><a href="#APOD">APOD</a></li>
                        <li><a href="#Mars Rover Photos">Mars Rover Photos</a></li>
                        <li><a href="#Mosaics">Mosaics</a></li>
                    </ul>
                </nav>
                <IconButton 
                    icon={notificationsIcon}
                    variant={IconButtonVariant.Circle}
                    title="Logo"
                    aria-label="Logo"
                />
                <Avatar
                    onClick={() => {
                    alert('clicked avatar');
                    }}
                    altText="Profile"
                />
                <Button variant={Button.Variant.Primary}>Sign Up</Button>
            </Header>
        )
    }
}

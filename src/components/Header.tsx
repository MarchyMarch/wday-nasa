import React from 'react';
import {Header, HeaderVariant, SearchBar} from '@workday/canvas-kit-labs-react-header';
import {IconButton, Avatar, Button, IconButtonVariant} from '@workday/canvas-kit-react';
import {notificationsIcon} from '@workday/canvas-system-icons-web';

interface HeaderProps{
}

interface HeaderState{
}

export class HeaderBar extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event : any): void{
        let query = (event.target as HTMLFormElement).getElementsByTagName('input')[0].value;
        console.log(query);
    }

    render(){
        return(
            <Header 
                title="WDAYxNASA" 
                brandUrl="#" 
                variant={HeaderVariant.Dub} 
                leftSlot={<SearchBar 
                    isCollapsed={false}
                    grow={false}
                    onSubmit={this.handleSearch}/>}>
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

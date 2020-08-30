import React from "react";
import {Avatar, Div, Search as SearchUI, SimpleCell} from "@vkontakte/vkui";
import {getRandomKey} from "../objects/Utils";


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: '',
            filtered: this.props.categories.reduce((a, b) => a.concat(b.games), []).slice(0, 6),
        };

        this.handleChange = this.handleChange.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    filterHandler() {
        const input = this.state.searchInput.toLowerCase();
        const data = this.props.categories.reduce((a, b) => a.concat(b.games), [])

        const filteredData = data.filter(item => {
            return ['name', 'description'].some(key => (item[key] ? item[key] : '').toLowerCase().includes(input));
        });

        let filtered = [];
        filteredData.map(values => filtered.push({...values}))

        this.setState({filtered: filtered});
    }

    handleChange(event) {
        this.setState({
            searchInput: event.target.value
        }, this.filterHandler);
    }

    render() {
        return <div>
            <SearchUI value={this.state.searchInput} onChange={this.handleChange}/>
            <Div>
                {
                    (this.state.filtered.length ? this.state.filtered.slice(0, 6) : []).map(game => <SimpleCell
                        key={getRandomKey()} className="CategoryCell" before={
                        <Avatar className="GameImageAvatar" style={{'--avatar-image': `url(${game.image})`}}/>
                    }
                        description={game.description} onClick={() => this.props.openGame(game)}>
                        {game.name}
                    </SimpleCell>)
                }
            </Div>
        </div>
    }
}

Search.propTypes = {};

export default Search;





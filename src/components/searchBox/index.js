import React, {Fragment, PureComponent} from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';

import {
    performSearch
} from '../../store/search/Actions';

export class SearchBox extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchTxt: ''
        };
    }

    handleSearch = (e) => {
        const searchTxt = this.state.searchTxt;
        this.props.performSearch(searchTxt);
    };

    setSearchTxt = (e) => {
        this.setState({searchTxt: e.target.value});
    };

    render() {
        return (
            <div>
                <div className="search-box">
                    <input type={'text'} onChange={this.setSearchTxt} />
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                <div>
                    {this.props.search.imageUrl &&
                        <Fragment>
                            <img src={this.props.search.imageUrl} alt={'Giphy'} />
                            <div>{this.props.search.imageUrl}</div>
                        </Fragment>}
                </div>
            </div>
        );
    }
}


SearchBox.propTypes = {
    search: PropTypes.object,
    performSearch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        performSearch: bindActionCreators(performSearch, dispatch),
    };
};

export function mapStateToProps(state) {
    return {
        search: state.search
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

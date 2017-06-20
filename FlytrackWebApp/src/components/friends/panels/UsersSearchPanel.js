/**
 * Created by sabir on 18.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CoolPreloader from '../../preloader/CoolPreloader'

import * as actions from '../../../redux/actions/UsersActions'

import debounce from 'debounce'

import FriendCardPanel from './FriendCardPanel'

class UsersSearchPanel extends React.Component {

    static defaultProps = {
        searchDebounceInterval: 300
    }

    static propTypes = {}

    state = {
        searchQuery: '',
        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getResultsUsers = () => {
        let {searchQuery} = this.state;
        if (searchQuery == undefined || searchQuery.trim().length < 3){
            return [];
        }
        let {users} = this.props;
        let text = searchQuery.toLowerCase().trim();
        let gss = (s) => {if (s == undefined){return ''}; return s;}
        return users.filter((u) => {
            let s = (gss(u.lastName) + gss(u.email)).toLowerCase();
            return (s.indexOf(text) > -1);
        })
    }

    search = () => {
        let {search} = this.props;
        let {searchQuery} = this.state;
        let canSubmit = (searchQuery != undefined && searchQuery.trim().length > 2);
        if (canSubmit == false){
            return;
        }
        search(searchQuery);
    }

    debouncedSearch = debounce(() => {this.search()}, this.props.searchDebounceInterval);

    render = () => {
        let {searchQuery, changed} = this.state;
        let {loading} = this.props;
        let canSubmit = (searchQuery != undefined && searchQuery.trim().length > 2);
        let users = this.getResultsUsers();

        return (
            <div className={'users_search_panel'} >

                <div className="search_panel_placeholder">

                    <div className="ui fluid icon input">
                        <input value={searchQuery}
                               autoFocus={true}
                        placeholder={'Введите фамилию или email пользователя'}
                        onChange={(evt) => {
                            this.debouncedSearch();
                            this.setState({
                                searchQuery: evt.target.value
                            });
                        }} />
                        <i className="search icon"></i>
                    </div>

                </div>

                {users.length == 0 ?
                    <div>
                        {(searchQuery == undefined || searchQuery.trim() < 3) ? null :
                            <div>
                                По вашему запросу ничего не найдено
                            </div>
                        }
                    </div>
                    :
                    <div className={'search_results_panel'} >
                        <div className={'ui cards one'} >
                            {users.map((u, k) => {
                                return (
                                    <FriendCardPanel id={u.id} key={u.id} />
                                )
                            })}
                        </div>
                    </div>
                }

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}


// let debounce = (func, wait, immediate) => {
//     let timeout;
//     return () => {
//         let context = this, args = arguments;
//         let later = () => {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         let callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// };


const mapStateToProps = (state) => {
   return {
       currentUserId: state.users.currentUserId,
       loading: state.users.loading,
       users: state.users.usersMap.toArray().filter((u) => {
           return (u.id != state.users.currentUserId)
       })
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        search: (text) => {
            return dispatch(actions.searchUsers(text))
        }
   }
}

UsersSearchPanel = connect(mapStateToProps, mapDispatchToProps)(UsersSearchPanel)

export default UsersSearchPanel
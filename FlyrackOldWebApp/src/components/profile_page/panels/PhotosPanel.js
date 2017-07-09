/**
 * Created by sabir on 23.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');



var PhotosPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading,
            photos: store.getAllUserPhotos(this.props.userId),
            loading: store.loading
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var photos = this.state.photos;
        photos = photos.slice(0, 4);

        return (
            <div style={this.componentStyle.placeholder} className={'photos_panel'} >

                {this.state.loading == true ? null :
                    <div className={'photos_header'} >
                        Фотографии <span className={'photos_number'} >{this.state.photos.length}</span>
                    </div>
                }

                {this.state.loading == false ?
                    (photos.length == 0 ? null :
                            <div className={'photos_list_placeholder'} >
                                {photos.map(function(p, k){
                                    var key = 'photo_' + k;

                                    return (
                                        <div className={'photo_placeholder'} key={key} >
                                            <div className={'photo'} >
                                                <BackgroundImageContainer style={{borderRadius: 2}}
                                                                          image={p.compressedUrl} />
                                            </div>
                                        </div>
                                    );

                                }, this)}
                            </div>
                    )

                    :
                    <div className={'photos_loading_placeholder'} >
                        Загрузка...
                    </div>
                }



            </div>
        );
    }

});

module.exports = PhotosPanel;
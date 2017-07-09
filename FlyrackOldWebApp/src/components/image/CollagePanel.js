/**
 * Created by sabir on 21.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('./BackgroundImageContainer');

var CollagePanel = React.createClass({
    getDefaultProps: function () {
        return {
            images: [
                'http://cardiomood.com/assets/images/sabir.jpg',
                'http://cardiomood.com/assets/images/anton.jpg',
                'http://cardiomood.com/assets/images/vapetr.jpg',
                'http://cardiomood.com/assets/images/apyht.jpg'
            ]
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
        var list = this.props.images;
        var n = list.length;
        var className = ' images_grid ';

        switch (n){
            case 0:
                className = className;
                break;
            case 1:
                className = className + ' one_grid'
                break;
            case 2:
                className = className + ' two_grid'
                break;
            case 3:
                className = className + ' three_grid'
                break;
            case 4:
                className = className + ' four_grid'
                break;
            default:
                className = className + ' many_grid'
        }

        var goodList = list.slice(0, 4);
        var extNumber = list.length - 4;

        if (n == 0){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} className={className} >

                {goodList.map(function(image, k){
                    var key = 'collage_' + k;
                    return (
                        <div key={key} className={'image_placeholder'} >
                            <BackgroundImageContainer image={image} />
                        </div>
                    );
                })}

                {extNumber <= 0 ? null :
                    <div className={'more_panel_placeholder'} >
                        <div className={'inner_panel'}>
                            <div className={'more_number_placeholder'} >
                                + {extNumber}
                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = CollagePanel;
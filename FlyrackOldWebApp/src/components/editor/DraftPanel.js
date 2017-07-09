/**
 * Created by sabir on 26.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Editor = require('draft-js').Editor;
var EditorState = require('draft-js').EditorState;
var RichUtils = require('draft-js').RichUtils;
var AtomicBlockUtils = require('draft-js').AtomicBlockUtils;
var Entity = require('draft-js').Entity;

var SabirBlock = require('./SabirBlock');

var DraftPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            editorState: EditorState.createEmpty()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        editorPlaceholder: {
            padding: 10,
            border: '1px solid grey'
        }
    },

    handleKeyCommand: function(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    },

    onChange: function(newEditorState){
        //console.log('onChange: newEditorState = ', newEditorState);
        //console.log('BlockTree = ', newEditorState.getBlockTree());
        //console.log('selection = ', newEditorState.getSelection());
        //console.log('currentContent = ', newEditorState.getCurrentContent());

        this.setState({
            editorState: newEditorState
        });
    },

    onClick: function(){
        var editorState = this.state.editorState;
        const entityKey = Entity.create('FUCK', 'IMMUTABLE', {src: ''});

        console.log('onClick: entityKey = ', entityKey);

        this.onChange(AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            ' '
        ));
    },

    blockRenderer: function(block){
        console.log('blockRenderer: block type = ', block.getType());
        if (block.getType() === 'atomic'){
            return {
                component: SabirBlock
            };
        }
        return null;
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button onClick={this.onClick} >
                    test button
                </button>

                <div style={this.componentStyle.editorPlaceholder}>
                    <Editor editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            blockRendererFn={this.blockRenderer}
                        />
                </div>

            </div>

        );
    }

});

module.exports = DraftPanel;
import { Component } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class EmojiSelect extends Component {
    constructor(props) {
        super(props)
    }
    
    handleSelect = (e) => {
        this.props.addEmojiToInput(e.native)
        this.props.EmojiMenuVisibility(false)
        this.props.inputRefCurrent.focus()
        console.log(e.native)
    }

    render() {
        return (
            <div className="emoji-wrapper">
                <Picker onSelect={this.handleSelect}/>
            </div>
        )
    }
  }
export default EmojiSelect

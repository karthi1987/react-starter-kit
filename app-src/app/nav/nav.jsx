import React from 'react';
import { render } from 'react-dom';

//scss
import './nav.scss';

class Nav extends React.Component{

	constructor( props ){
        super( props );

        this.state = {
        	giver : {
				avatar: null,
				name: null
        	},
        	receiver: {
				avatar: null,
				name: null,
				tagline: null,
				time: null,
				message: null
        	},
        	products: null
        }
    }

    componentWillReceiveProps(nextProps) {
    	let items = nextProps.products || [];
    	if ( items.length ) {
			this.updateStateAsWhenNeeded(items[0]);
			this.setState({"products": items});
    	}
    }

    updateStateAsWhenNeeded(item) {
    	this.setState(
			{
				"giver": {
					"name" : item.giver.firstName+" "+item.giver.lastName,
					"avatar" : item.giver.avatarUrl
				},
				"receiver": {
					"name": item.recievers[0].firstName+" "+item.recievers[0].lastName,
					"avatar": item.recievers[0].avatarUrl,
					"tagline": null,
					"time": item.recognitionDate,
					"message": item.comments

				}
			}
		);
    }

    updateLeftSlider(props, event) {
    	event.preventDefault();
    	this.updateStateAsWhenNeeded(props);
    }

   render() {

   		let {giver, receiver, products} = this.state;

        return(

    		<div className="content">
    				<div className="content-left">
		    				<div className="content-header">
		    					<div className="recognitionby-image">
		    						<img src={receiver.avatar} />
		    					</div>
		    					<div className="recognitionby-username-tagline">
		    						<p className="recognitionby-username">
		    							{receiver.name}
		    						</p>
		    						<p className="recognitionby-tagline">
		    							{receiver.tagline}
		    						</p>
		    					</div>
		    					<div className="recognitionby-time">
		    						<p> {receiver.time} </p>
		    					</div>
		    				</div>
		    				<div className="content-main">
		    					<p className="recogninized-text">
		    						{receiver.message}
		    					</p>
		    				</div>
		    				<div className="content-footer">
		    					<div className="recognized-by">
		    						<div className="recognized-sentby">
		    							<p> sent by
		    								<span> {giver.name}</span>
		    							</p>
		    						</div>
		    						<div className="recognizedby-image">
		    							<img src={giver.avatar} />
		    						</div>
		    					</div>
		    				</div>
		    			</div>
		    			<div className="content-right">
		    				<div className="recognized-items">
		    					<ul>
		    					 	 {
		    	                        products && products.length && products.map(
		    	                            ( item, i ) =>
		    	                                <RecoginitionList key={ i }
		    	                                    item={ item } 
		    	                                    updateSlides={ this.updateLeftSlider.bind( this ) } />
		    	                        )
		    	                    }
		    						
		    					</ul>
	    				</div>
	    			</div>
	    	</div>
        )
    }

}


/*
 *
 *   2. Right Slider
 *
 *   List view of the Recoginition
 *
 */
class RecoginitionList extends React.Component{
    render(){
    	let {comments, eCardUrl, giver, recievers, recognitionDate, promotionName, promotionType} = this.props.item;
        return(
        	<li className="recognized-list" onSelect={this.props.updateSlides} onClick={this.props.updateSlides.bind(this, this.props.item)}>
				<a href="#" className="recognized-list-info" >
					{
						recievers && recievers.length
						&& 
						<RecoginitionName names={recievers} />
					}
				</a>
			</li>
        )
    }
}

/*
 *
 *   3. Right Slider Recoginition Name
 *
 *   List view of the Recoginition
 *
 */
class RecoginitionName extends React.Component {
	modifyName(names){
		let modifiedNames = [];
		if (names.length) {
			names.map((name, i)=> {
				modifiedNames = [ ...modifiedNames, name.firstName +" "+ name.lastName ];
			})
			modifiedNames.join(", ");
		}
	return modifiedNames;
	}
	receiverImage() {
		if (this.props.names.length > 1) {
			return this.props.names.length;
		} else {
			return this.props.names[0].avatarUrl;
		}
	}
    render(){
    	let {names} = this.props;
        return(
        	<div>
	        	<span className="recognized-list-image">
	        	{
	        		names && names.length > 1
	        		?
	        		<span className="more-people">{this.receiverImage()}</span>
	        		:
					<img src={this.receiverImage()} />
	        	}
				</span>
				<span className="recognized-list-message"> 
					{this.modifyName(names)}
				</span>
			</div>
        )
    }
}


export default Nav;

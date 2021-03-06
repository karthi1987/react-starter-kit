import React from 'react';
import { render } from 'react-dom';
import Slider from 'react-slick';
import $ from 'jquery';

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
			this.updateStateAsWhenNeeded(items[0], items);
			//this.setState({"products": items});
    	}
    }

    updateStateAsWhenNeeded(item, products) {
    	//console.log("update item", item, " products ", products);
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
				},
				"products": products
			}
		);
    }

    updateLeftSlider(props, products) {
    	this.updateStateAsWhenNeeded(props, products);
    }

   render() {

   		let {giver, receiver, products} = this.state;

        return(

    		<div className="content">
				<div className="content-left">
    				<RecognitionHeader item={this.state.receiver} />

    				<RecognitionHeartContent item={this.state.receiver} />
    				
    				<RecognitionFooter item={this.state.giver} />
    			</div>
    			<div className="content-right">
    				<div className="recognized-items">
    				{
    					this.state.products && this.state.products.length
    					&&
				 	 	<ReactSlickDemo products={this.state.products} updateLeftSlider={this.updateLeftSlider.bind(this)}/>
    				}
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
class RecognitionHeader extends React.Component{
	constructor( props ){
        super( props );
        this.state = {
        	avatar: props.avatar || null,
        	header: {
				image: {
					'transform': "translate3d(0, "+ ( 250 ) +"px,  0 )",
				},
				name: {
					'transform': "translate3d(0, "+ ( 250 ) +"px,  0 )",

				},
				tagline: {
					'transform': "translate3d(0, "+ ( 250 ) +"px,  0 )",

				},
	        	time : {
					'transform': "translate3d(0, "+ ( 250 ) +"px,  0 )",
	        	}
        	}
        }
    }

    componentWillReceiveProps(nextState, nextProps) {
    	if ( nextState.item.name ){
    		setTimeout(
			() => {
			    this.setState({
			       "avatar":nextState.item.avatar,
			       "header" : {
			       		"image" : {
							'transformStyle': 'preserve-3d',
							'transition': 'all 2s ease-in-out',
			       			"transform":  "translate3d(0, "+ ( 50 ) +"px,  0 )"
			       		}
			       }
			    })
			},
			500
		)
    	}
    }

    render(){
    	let {avatar, name, tagline, time} = this.props.item;

        return(

			<div className="content-header">
			{
				this.props.item 
				?
				<div>
					<div className="recognitionby-image" style={this.state.header.image}>
						<img src={avatar} />
					</div>
					<div className="recognitionby-username-tagline">
						<p className="recognitionby-username" style={this.state.header.image}>
							{name}
						</p>
						<p className="recognitionby-tagline" style={this.state.header.tagline}>
							{tagline}
						</p>
					</div>
					<div className="recognitionby-time" ref="time">
						<p style={this.state.header.image}> {time} </p>
					</div>
				</div>
				:
				<span>No Results</span>
			}
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
class RecognitionHeartContent extends React.Component{

	constructor( props ){
        super( props );

        this.state = {
        	avatar: props.avatar || null,
        	recogninized: {
				'transform': "translate3d(0, "+ ( 550 ) +"px,  0 )",
        	}
        }
    }

    componentWillReceiveProps(nextState, nextProps) {
    	//console.log("nextState", nextState.item.products);
    	if ( nextState.item && nextState.item.name ){
    		setTimeout(
			() => {
			    this.setState({
			       "avatar":nextState.item.avatar,
			       "recogninized" : {
						'transformStyle': 'preserve-3d',
						'transition': 'all 2s ease-in-out',
		       			"transform":  "translate3d(0, "+ ( 150 ) +"px,  0 )"
			       }
			    })
			},
			500
		)
    	}
    }

    render(){
    	let {message} = this.props.item;
        return(

			<div className="content-main">
				{
					this.props.item
					?
					<p className="recogninized-text" style={this.state.recogninized}>
						{message}
					</p>
					:
					<span>No Results</span>
				}
				
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
class RecognitionFooter extends React.Component {
	constructor( props ){
        super( props );

        this.state = {
        	avatar: props.avatar || null,
        	giver: {
				'transform': "translate3d(0, "+ ( 350 ) +"px,  0 )",
        	}
        }
    }

    componentWillReceiveProps(nextState, nextProps) {
    	//console.log("nextState", nextState.item.products);
    	if ( nextState.item && nextState.item.name ){
    		setTimeout(
			() => {
			    this.setState({
			       "avatar":nextState.item.avatar,
			       "giver" : {
						'transformStyle': 'preserve-3d',
						'transition': 'all 2s ease-in-out',
		       			"transform":  "translate3d(0, "+ ( 0 ) +"px,  0 )"
			       }
			    })
			},
			500
		)
    	}
    }

    render(){
    	let {name, avatar} = this.props.item;
        return(

			<div className="content-footer">
				{
					this.props.item 
					?
					<div className="recognized-by" style={this.state.giver}>
						<div className="recognized-sentby">
							<p> sent by
								<span> {name}</span>
							</p>
						</div>
						<div className="recognizedby-image">
							<img src={avatar} />
						</div>
					</div>
					:
					null
				}
				
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
	        		<span>{this.receiverImage()}</span>
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

/*
 *
 *   4. Right Slider Recoginition List
 *
 *   
 *
 */

class ReactSlickDemo extends React.Component{
	highlightActiveItem(currentSlide){
		$(".recognized-items .slick-track").find(".recognized-list").removeClass("selected");
		$(".recognized-items .slick-track .recognized-list").eq(currentSlide).addClass("selected");
	}
   render(){

	let {products, updateLeftSlider} = this.props;

	let self = this;
	let interval = "";

    const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		vertical: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 4000,
		beforeChange: function (currentSlide, nextSlide) {
			//console.log('before change', currentSlide, nextSlide);
			self.highlightActiveItem(nextSlide);
		},
		afterChange: function (currentSlide) {
			//console.log('after change', currentSlide, products[currentSlide]);
			updateLeftSlider(products[currentSlide], products);
		}
    };

      return (
      	<div style={
      		{
      			"margin": "0 auto",
			    "color": "#333",
			    "height": "700px"
			}
		}>
		<ul>
		{
			products && products.length > 0
			?
			 <Slider {...settings}>
	         { 
	         	products.map(
     				     ( item, index ) =>
     			          <li className="recognized-list" data-index={index} key={index}>
     			          	<a href="#" className="recognized-list-info" >
     						     {
     						         item.recievers && item.recievers.length 
     						         && 
     						         <RecoginitionName names={item.recievers} />
     						     }
     						</a>
     			          </li>
     					)
	         }
			</Slider>
			:
			null
		}
		</ul>
        </div>
    )
   }
 }

 /*
 *	5. Left Side Parallex component
 *
 *
 */

 class ParallaxComponentUI extends React.Component {
 	constructor( props ){
        super( props );

        this.state = {
        	width: "300"
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
    	let {} = this.props;
    	let index = 1;
    	let left = 40;

		let fontStyle2 = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100,
			color: 'darkgrey'
		};

		const wrap = {
	      height: window.innerHeight * 10,
	    };
        return(
	        <section>
	            <Parallax className="parallax" speedDivider="5">
	                <div>Hello World!</div>
	            </Parallax>
	        </section>
        )
    }
}




export default Nav;

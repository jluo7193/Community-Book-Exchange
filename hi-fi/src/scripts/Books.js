import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { MediaGallery } from './Media';

class Books extends Component {
	render() {
		let hLeft = <Link className="btn" to="/notifications"><i className="fa fa-lg fa-bell"></i></Link>;
		let hRight = <Link className="btn" to="/addbook"><i className="fa fa-lg fa-plus"></i></Link>;

	    return (
	    	<div>
		    	<Header leftBtn={hLeft} title="Books" rightBtn={hRight}/>
			    <main className="scroll">
			    	<MediaGallery media={this.props.books} />
			  	</main>
		  	</div>
	    );
  	}
}

export default Books;
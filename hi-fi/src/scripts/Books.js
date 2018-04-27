import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Header from './Header';
import { MediaGallery } from './Media';
import { BackButton } from './Misc';

class Books extends Component {
	render() {
	    return (
	    	<Switch>
	    		<Route path="/books/:id" render={(props) => <BookDetails {...props} books={this.props.data.books} users={this.props.data.users}/>}/>
	    		<Route path="/books" render={(props) => <AllBooks books={this.props.data.books} />}/>
		  	</Switch>
	    );
  	}
}

class AllBooks extends Component {
	render(){		
		let hLeft = <Link className="btn" to="/notifications"><i className="fa fa-lg fa-bell"></i></Link>;
		let hRight = <Link className="btn" to="/addbook"><i className="fa fa-lg fa-plus"></i></Link>;

		return(
			<div>
				<Header leftBtn={hLeft} title="Books" rightBtn={hRight}/>
			    <main className="scroll">
			    	<MediaGallery media={this.props.books} />
			  	</main>
			</div>
		);
	}
}


class BookDetails extends Component {
	render(){
		let users = [], book, count, bookContent;

		if(this.props.books){
			book = this.props.books[this.props.match.params.id]; //this is cheating, but who cares :)
		}
		
		if(this.props.users){
			users = this.props.users.filter(u => u.books.indexOf(book.id) > -1);
			count = users.length === 1 ? users[0].username : users.length + ' users';
		}

		

		let hLeft = <BackButton></BackButton>;
		let hRight = users.length ? <Link className="btn" to="requestbook">Request</Link> : <a className="btn">Waitlist</a> ;

		if(book) {
			bookContent = (
				<div>
					<Header leftBtn={hLeft} title={book.title} rightBtn={hRight}/>
					<main className="scroll book-details">
						<img className="whiteframe-shadow-4dp" src={book.img} />
					    <p className="title">{book.title}</p>
					    { users.length ? <p className="availability">Available from <span>{count}</span></p> : <p className="availability">Unavailable</p> }
					    <p className="description">{book.description}</p>
					    {users.length > 0 && <Link className="whiteframe-shadow-8dp btn-outline btn-r" to="requestbook">Request Book</Link>}
					    { /*TODO  implement adding it to the user's waitlist and give him a confirmation (change the button to Added to waitlist, and disable it) */}
					    {users.length === 0 && <button className="whiteframe-shadow-8dp btn-outline btn-r">Add to Waitlist</button>}
					</main>
				</div>
			); 
		} else {
			bookContent = <h3>No Book Info</h3>;
		}

		return bookContent;
	}
}

export default Books;
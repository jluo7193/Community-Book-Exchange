import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Header from './Header';
import { MediaGallery } from './Media';
import { BackButton } from './Misc';
import Dispatcher from './Dispatcher';

class Books extends Component {
	render() {
	    return (
	    	<Switch>
	    		<Route path="/books/:id/request" render={(props) => <BookRequest {...props} books={this.props.data.books} users={this.props.data.users}/>}/>
	    		<Route path="/books/:id" render={(props) => <BookDetails {...props} exchanges={this.props.data.exchanges} books={this.props.data.books} users={this.props.data.users} user={this.props.user}/>}/>
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
		let users = [], book, count, bookContent, bookStatus;

		if(this.props.books){
			book = this.props.books[this.props.match.params.id]; //this is cheating, but who cares :)

			if(this.props.users){
				users = this.props.users.filter(u => u.books.filter(b => b.id === book.id ).length);
				count = users.length === 1 ? users[0].username : users.length + ' users';
			}

			//Set book status
			if(this.props.exchanges && this.props.user) {
				let activeExchange = this.props.exchanges.filter(e => e.bookId === book.id && (e.borrowerId == this.props.user.id || e.lenderId == this.props.user.id) && (e.status === "requested" || e.status === "borrowed"))[0];

				if(activeExchange) {
					bookStatus = activeExchange.borrowedId === this.props.user.id ? activeExchange.status : activeExchange.status === "borrowed" ? "lent" : "requested";
				} else if(this.props.user.waitlist.indexOf(this.props.match.params.id) > -1) {
					bookStatus = "waitlisted";
				} else if(!users.length) {
					bookStatus = "unavailable";
				}
			}

		}
		
		let hLeft = <BackButton></BackButton>;

		if(book) {
			let actionButton, hRight, alert;

			switch(bookStatus){
				case 'waitlisted':
					//TODO Implement onClick - removing from waitlist
					actionButton = <button className="whiteframe-shadow-4dp btn-outline btn-r">Remove From Waitlist</button>;
					break;
				case 'requested':
					actionButton = <button disabled className="whiteframe-shadow-4dp btn-outline btn-r">Requested</button>;
					alert = <Alert bsStyle="warning"><strong>Book requested.</strong> Awaiting Confirmation</Alert>;
					break;
				case 'borrowed':
					//TODO Implement onClick - requesting to return a book
					actionButton = <button className="whiteframe-shadow-4dp btn-outline btn-r">Return</button>;
					hRight = <a className="btn">Return</a>;
					break;
				case 'unavailable':
					actionButton = <button className="whiteframe-shadow-8dp btn-outline btn-r">Add to Waitlist</button>;
					hRight = <a className="btn">Waitlist</a>;
					break;
				case 'lent':
					actionButton = <button disabled className="whiteframe-shadow-4dp btn-outline btn-r">Book Lent</button>;
					break;
				default:
					actionButton = <Link className="whiteframe-shadow-8dp btn-outline btn-r" to={this.props.match.url + "/request"}>Request Book</Link>;
					hRight = <Link className="btn" to={this.props.match.url + "/request"}>Request</Link>;
			}

			bookContent = (
				<div>
					<Header leftBtn={hLeft} title={book.title} rightBtn={hRight}/>
					<main className="scroll book-details">
						{alert}
						<img className="whiteframe-shadow-4dp" src={book.img} />
					    <p className="title">{book.title}</p>
					    { users.length ? <p className="availability">Available from <span>{count}</span></p> : <p className="availability">Unavailable</p> }
					    <p className="description">{book.description}</p>
					    {actionButton}
					</main>
				</div>
			); 
		} else {
			bookContent = <h3 className="empty-msg">No Book Info</h3>;
		}

		return bookContent;
	}
}

class BookRequest extends Component {
	requestBook(lenderId){
        Dispatcher.dispatch({
            actionType: 'request-book',
            payload: {"bookId":parseInt(this.props.match.params.id), "lenderId":lenderId, "status":"requested", "pickup":{}, "return":{}}
        });
        this.props.history.go(-1);
	}


	render(){
		let usersList = [], book, bookContent;

		if(this.props.books){
			book = this.props.books[this.props.match.params.id]; //this is cheating, but who cares :)
		}
		
		let hLeft = <BackButton></BackButton>;

		if(book) {

			if(this.props.users){
				usersList = this.props.users.reduce((l, u) => {
					let userBook = u.books.filter(b => b.id === book.id );
					if(userBook.length) {
						l.push(
							<li key={u.id}>
								<span>{u.username}</span>
					          	<span><i className="fa fa-star"></i> {u.rating}</span>
					          	<span className="condition">{userBook[0].condition}</span>
					          	<a className="btn" onClick={() => this.requestBook(u.id)}>Request&nbsp;&nbsp;<i className="fa fa-chevron-right"></i></a>
					        </li>
						);	
					}

					return l;
				}, []);
			}

			bookContent = (
				<div>
					<Header leftBtn={hLeft} title={book.title} />
					<main className="scroll book-request">
					    <ul className="users">
					    	{usersList}
					    </ul>		
					</main>
				</div>
			);
		} else {
			bookContent = <h3 className="empty-msg">No Book Info</h3>;
		}

		return bookContent;
	}
}

export default Books;
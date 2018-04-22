import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { MediaRow } from './Media';

class Profile extends Component {
	render() {
		let myBooks, myCommunities, borrowedBooks, waitlist;
		let user = this.props.user; 

		let hLeft = <Link className="btn" to="/notifications"><i className="fa fa-lg fa-bell"></i></Link>;
		let hRight = <Link className="btn" to="/settings"><i className="fa fa-lg fa-cog"></i></Link>;

		if(this.props.data){
			let borrowedIds = this.props.data.exchanges && this.props.data.exchanges.reduce((l, e) => { if(e.borrowerId === user.id && e.status === "borrowed") l.push(e.bookId); return l }, []);

			//Show only the books belonging to this user
			myBooks = this.props.data.books && this.props.data.books.filter(b => user.books.indexOf(b.id) > -1);
			//TODO Add the status of the books to each object by joning with "exchanges" on bookId
			myCommunities = this.props.data.communities && this.props.data.communities.filter(c => user.books.indexOf(c.id) > -1);
			borrowedBooks = this.props.data.books && this.props.data.books.filter(c => borrowedIds.indexOf(c.id) > -1);
			waitlist = this.props.data.books && this.props.data.books.filter(b => user.waitlist.indexOf(b.id) > -1); 				
		}

	    return (
	    	<div>
		    	<Header leftBtn={hLeft} title="Profile" rightBtn={hRight}/>
				<main className="scroll">
					<div className="profile-row whiteframe-shadow-1dp">
						{!user.img && <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>}
						{user.img && <img className="whiteframe-shadow-1dp" src={user.img}/>}
						<h4>{user.firstName} {user.lastName}</h4>
						<div className="stats">
							<i className="fa fa-users fa-lg" aria-hidden="true"></i> {myCommunities && myCommunities.length}&nbsp;&nbsp;&nbsp;
							<i className="fa fa-book fa-lg" aria-hidden="true"></i> {myBooks && myBooks.length}&nbsp;&nbsp;&nbsp;
							<i className="fa fa-lg fa-star"></i> {user.rating}
						</div>
					</div>

					<MediaRow title="My Books" media={myBooks} addLink="/addBook" lineTwo="status"/>
					<MediaRow title="My Communities" media={myCommunities} addLink="/addCommunity"/>
					<MediaRow title="Borrowed Books" media={borrowedBooks}/>
					<MediaRow title="Waitlist" media={waitlist}/>
				</main>
			</div>
	    );
  	}
}

export default Profile;
import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Header from './Header';
import { MediaGallery, MediaRowBody } from './Media';
import { BackButton } from './Misc';


class Communities extends Component {
	render() {
	    return (
	    	<Switch>
	    		<Route path="/communities/:id" render={(props) => <CommunityDetails {...props} communities={this.props.data.communities} books={this.props.data.books} users={this.props.data.users} />}/>
	    		<Route path="/communities" render={(props) => <AllCommunities communities={this.props.data.communities} />}/>
		  	</Switch>
	    );
  	}
}

class AllCommunities extends Component {
	render() {
		let hLeft = <Link className="btn" to="/notifications"><i className="fa fa-lg fa-bell"></i></Link>;
		let hRight = <Link className="btn" to="/addcommunity"><i className="fa fa-lg fa-plus"></i></Link>;

	    return (
	    	<div>
		    	<Header leftBtn={hLeft} title="Communities" rightBtn={hRight}/>
			    <main className="scroll">
			    	<MediaGallery media={this.props.communities} />
			  	</main>
		  	</div>
	    );
  	}
}

class CommunityDetails extends Component {
	render(){
		let users = [], books = [], community, count, communityContent;

		if(this.props.communities){
			community = this.props.communities[this.props.match.params.id]; //this is cheating, but who cares :)
		}
		
		if(community && this.props.users){
			users = this.props.users.filter(u => u.communities.indexOf(community.id) > -1);
		}

		if(community && this.props.books){
			books = this.props.books.filter(b => community.books.indexOf(b.id) > -1);
		}

		
		let hLeft = <BackButton></BackButton>;
		let hRight = <Link className="btn" to="join">Join</Link> ; //TO DO Add Leave btn

		if(community) {
			communityContent = (
				<div>
					<Header leftBtn={hLeft} title={community.title} rightBtn={hRight}/>
					<main className="scroll community-details">
						<ul className="list-description description-row whiteframe-shadow-1dp"  style={{backgroundImage:'url(' + community.img + ')'}}>
							<li><i className="fa fa-users"></i> {users.length}</li>
							<li><i className="fa fa-book"></i> {community.books.length}</li>
							<li><i className="fa fa-map-marker"></i> {community.location}</li>
							<li className="description">{community.description}</li>
						</ul>
						<MediaRowBody media={books} small />
						<EventsTimeline events={community.events} />
					</main>
				</div>
			); 
		} else {
			communityContent = <h3 className="empty-msg" >No Community Info</h3>;
		}

		return communityContent;
	}
}

class EventsTimeline extends Component {
	render(){
		let events = this.props.events.map(e => <EventItem key={e.id} event={e} />)
		return (						
			<ul className="events-list">
				<li className="title"><h3 className="media-row-title">Events</h3></li>
				{events}
				<li className="new-event"><a className="add-event btn">Add Event</a></li>
			</ul>
		);
	}
}

class EventItem extends Component {
	render(){
		let event = this.props.event;

		return (
			<li className="event">
				<p className="event-time">{event.date}<br/>{event.time}</p>
				<p className="event-details"><span>{event.title}</span><br/><span>{event.description}</span></p>
			</li>
		);
	};
}

export default Communities;
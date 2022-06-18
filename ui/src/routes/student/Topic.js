import TutorService from "../../services/tutor.service";
import TopicService from "../../services/topic.service";
import React, { Component } from "react";
import NavBar from "../components/NavBar";
import "./Topic.css";

class TopicList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
    };

    this.setTopics = this.setTopics.bind(this);
  }

  setTopics(topics) {
    this.setState({
      topics,
    });
  }

  render() {
    return (
      <main>
        <NavBar role="tutor" />
        <div className="topic-list">
          <h3 className="sub-t">Encuentra un tutor disponible para tu asignatura</h3>
          <hr className="line"></hr>
          {this.state.topics.map((item) => {
            return <Topic topic={item} />;
          })}
        </div>
      </main>
    );
  }

  componentDidMount() {
    TopicService.getTopicList(this.setTopics);
  }
}

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutors: [],
    };

    this.setTutors = this.setTutors.bind(this);
  }

  setTutors(tutors) {
    this.setState({
      tutors,
    });
  }

  render() {
    return (
      <div>
        <h4 className="topic-name">{this.props.topic.name}</h4>
        {this.state.tutors.map((item) => {
          return (
            <div className="tutor-detail">
              <div className="name-tuto">{item.name}</div>
              <br></br>
              {item.email}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    TutorService.getTutorsByTopic(this.props.topic.id, this.setTutors);
  }
}

export default TopicList;

import TutorService from '../../services/tutor.service';
import TopicService from '../../services/topic.service';
import React, { Component } from 'react';


class TopicList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
        }

        this.setTopics = this.setTopics.bind(this);
    }

    setTopics(topics) {
        this.setState({
            topics,
        })
    }

    render() {
        return (
            <div>
                
                <h3>Tematicas</h3>
                {

                    this.state.topics.map(item => {
                        return <Topic topic={item} />;
                    })
                }
            </div>
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
        }

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
                <h4>{this.props.topic.name}</h4>
                Lista de tutores:
                {
                    this.state.tutors.map(item => {
                        return <div>
                            {item.name}
                            <span> </span>
                            {item.email}
                        </div>
                    })
                }
            </div>
        );
    }

    componentDidMount() {
        TutorService.getTutorsByTopic(this.props.topic.id, this.setTutors);
    }

}

export default TopicList;
import AuthService from "../../services/auth.service";
import { Component } from "react";
import { Link } from "react-router-dom";

class TutoresDisponibles extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          subject: null,
        };
    
        this.setSubject = this.setSubject.bind(this);
      }
    
      setSubject(subject) {
        this.setState({
          subject,
        })
      }
  render() {
    return <seeTutors subject={this.props.subject}/>;
  }
}

const seeTutors = function ({subject}) {
    return(
        <section>
            <div>
                {subject}
            </div>
        </section>
    );
}

export default TutoresDisponibles;
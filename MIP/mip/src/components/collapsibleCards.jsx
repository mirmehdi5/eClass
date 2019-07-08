import React, { Component } from "react";
import Collapsible from "react-collapsible";
import Completed from "./completed";

class CollapsibleCards extends Component {
  state = {};
  render() {
    return (
      <Collapsible trigger={this.props.cardContent.Topic[0].module}>
        {
          <ul>
            {this.props.cardContent.Topic.map(urlValue => (
              <li key={urlValue.name}>
                <button
                  className="button"
                  onClick={() => this.props.onCourseRedirect(urlValue)}
                >
                  {urlValue.name}
                </button>

                <Completed status={urlValue.completed} />
              </li>
            ))}
          </ul>
        }
      </Collapsible>
    );
  }
}

export default CollapsibleCards;

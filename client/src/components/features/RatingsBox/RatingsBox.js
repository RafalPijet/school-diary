import React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

class RatingsBox extends React.Component {
    state = {
        activeTab: 1
    };

    componentDidMount() {
        this.toggle(1)
    }

    toggle = tab => {
        const {activeTab} = this.state;
        if (activeTab !== tab) this.setState({activeTab: tab});
    };
    render() {
        const {students} = this.props.user;
        const {activeTab} = this.state;
        return (
            <div>
                <Nav tabs>
                    {students.map((item, i) => {
                        return (
                            <NavItem key={i}>
                                <NavLink
                                    className={classnames({active: activeTab === i + 1})}
                                    onClick={() => {
                                        this.toggle(i + 1);
                                    }}
                                >
                                    {`${item.firstName} ${item.lastName}`}
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {students.map((item, i) => {
                        return (
                            <TabPane tabId={i + 1} key={i}>
                                <h4>{item.ratings.length + " -- " + i}</h4>
                            </TabPane>
                        )
                    })}
                </TabContent>
            </div>
        );
    }
};

export default RatingsBox;

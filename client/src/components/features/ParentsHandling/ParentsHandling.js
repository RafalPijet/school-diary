import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../../common/ParentItem/ParentItem';

class ParentsHandling extends React.Component {
    componentDidMount() {
        const {loadParents} = this.props;
        loadParents();
    }

    render() {
        const {request, parents} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if (request.success) {
            return (
                <div>
                    <Table dark>
                        <thead>
                            <tr>
                                <th className='text-right'>Pos</th>
                                <th className='text-left'>Last name</th>
                                <th className='text-left'>First name</th>
                                <th className='text-center'>Birth date</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Student(s)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {parents.map((parent, i) => {
                            return <ParentItem i={i} key={i} parent={parent}/>
                        })}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (
                <div>Parents Searching...</div>
            )
        }
    }
}

ParentsHandling.propTypes = {
    loadParents: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired
};

export default ParentsHandling;

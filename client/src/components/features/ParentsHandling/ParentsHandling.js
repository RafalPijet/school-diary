import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../ParentItem/ParentItem';
import './ParentsHandling.scss';

const ParentsHandling = props => {
    const {loadParents, loadClasses, loadStudents, request, parents, resetRequest} = props;
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        loadParents();
        loadClasses();
        loadStudents();
        return () => {
            resetRequest();
        }
    }, [loadParents, loadClasses, loadStudents, resetRequest]);

    const collapseHandling = index => {
        setSelectedItem(index);
    };

    if (request.pending || request.working) {
        return <Spinner/>
    } else if (request.success) {
        return (
            <div>
                <div className='col-12 parents-main'>
                    <span className='text-left col-1'>Pos</span>
                    <span className='text-left col-2'>Last name</span>
                    <span className='text-left col-2'>First name</span>
                    <span className='text-center col-2'>Birth date</span>
                    <span className='text-center col-4'>Email</span>
                    <span className='text-center col-1'>Students</span>
                </div>
                <div>
                    {parents.map((parent, i) => {
                        return <ParentItem
                            i={i}
                            key={i}
                            parent={parent}
                            selectedItem={selectedItem}
                            collapseHandling={collapseHandling}
                            />
                    })}
                </div>

            </div>
        )
    } else {
        return (
            <div>Parents Searching...</div>
        )
    }
};

ParentsHandling.propTypes = {
    loadParents: PropTypes.func.isRequired,
    loadClasses: PropTypes.func.isRequired,
    loadStudents: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired
};

export default ParentsHandling;

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../../common/ParentItem/ParentItem';
import './ParentsHandling.scss';

const ParentsHandling = props => {
    const {loadParents, request, parents} = props;
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        loadParents();
    }, [loadParents]);

    const collapseHandling = index => {
        setSelectedItem(index);
        console.log(index)
    };

    if (request.pending) {
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
    parents: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired
};

export default ParentsHandling;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import api from '../api/api';
import Projects from './projects';

class ProjectContainer extends React.Component {
    render() {
        return <Projects {...this.props} />
    }
};

// pass in state data as props data
const stateToProps = function(state) {
    return {
        projects: state.projectReducer.projects,
        numberProjects: state.projectReducer.projects.length,
        loggedin: state.authReducer.authorised
    }
}

// pass down events as props
const dispatchToProps = function(state) {
    return {
        openEditInput (e, data) {
            e.preventDefault();

            $('#edit').modal('show');
            
            // edit form fields elements
            let editProjectEle = document.querySelector('.edit-project');
            let fieldsWrapper = editProjectEle.querySelector('.edit-fields');
            let company = editProjectEle.querySelector('.company');
            let project = editProjectEle.querySelector('.project-name');
            let link = editProjectEle.querySelector('.link');
            let skills = editProjectEle.querySelector('.skills');
            let description = editProjectEle.querySelector('.description');

            // get selected parent DOM element
            let projectContainerUL = e.target.parentElement.parentNode.parentNode;

            // get selected project values
            let currentValueCompany = projectContainerUL.parentNode.querySelector('.company-name').textContent.split(':')[1];
            let currentValueProject = projectContainerUL.getElementsByClassName('project')[0].textContent;
            let currentValueLink = projectContainerUL.getElementsByClassName('link')[0].textContent;
            let currentValueSkills = projectContainerUL.getElementsByClassName('skills')[0].textContent;
            let currentValueDescription = projectContainerUL.getElementsByClassName('description')[0].textContent;

            // set edit field data attribute values
            fieldsWrapper.setAttribute('data-company-id', e.target.getAttribute('data-company-id'));
            fieldsWrapper.setAttribute('data-project-id', e.target.getAttribute('data-project-id'));

            // set edit form field values
            company.value = currentValueCompany.trim();
            project.value = currentValueProject.trim();
            link.value = currentValueLink.trim();
            skills.value = currentValueSkills.trim();
            description.value = currentValueDescription.trim();

        },
        deleteProject (e) {
            e.preventDefault();

            let ele = e.target;
            let companyId = ele.getAttribute('data-company-id');
            let projectId = ele.getAttribute('data-project-id');
            let projectList = document.getElementById(companyId);
            let projectListItems = projectList.getElementsByTagName('li');
            let projectListItemsLength = projectListItems.length;

            api.deleteProject(companyId, projectId, projectListItemsLength);
        }
    }
}

ProjectContainer.propTypes = {
    projects: PropTypes.array,
    numberProjects: PropTypes.number,
    loggedin: PropTypes.bool,
    openEditInput: PropTypes.func,
    deleteProject: PropTypes.func
};

export default connect(stateToProps, dispatchToProps)(ProjectContainer)
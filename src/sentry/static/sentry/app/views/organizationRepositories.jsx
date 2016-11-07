import React from 'react';

import ApiMixin from '../mixins/apiMixin';
import DropdownLink from '../components/dropdownLink';
import LoadingIndicator from '../components/loadingIndicator';
import MenuItem from '../components/menuItem';
import OrganizationHomeContainer from '../components/organizations/homeContainer';
import {t} from '../locale';

const OrganizationRepositories = React.createClass({
  mixins: [
    ApiMixin,
  ],

  getInitialState() {
    return {
      loading: true,
      error: false,
      itemList: null,
      repoConfig: null,
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  fetchData() {
    this.api.request(`/organizations/${this.props.params.orgId}/repos/`, {
      method: 'GET',
      success: (data) => {
        this.setState({
          itemList: data,
          loading: !this.state.repoConfig,
        });
      },
      error: () => {
        this.setState({
          loading: !this.state.repoConfig,
          error: true,
        });
      }
    });
    this.api.request(`/organizations/${this.props.params.orgId}/config/repos/`, {
      method: 'GET',
      success: (data) => {
        this.setState({
          repoConfig: data,
          loading: !this.state.itemList,
        });
      },
      error: () => {
        this.setState({
          loading: !this.state.itemList,
          error: true,
        });
      }
    });
  },

  render() {
    if (this.state.loading)
      return <LoadingIndicator />;

    return (
      <OrganizationHomeContainer>
        <h2>{t('Repositories')}</h2>
        <table className="table table-bordered">
          <tbody>
            {this.state.itemList.map((repo) => {
              return <tr><td><a>{repo.name}</a></td></tr>;
            })}
          </tbody>
        </table>
        <DropdownLink
            className="btn btn-primary btn-sm"
            title={t('Add Repository')}>
          {this.state.repoConfig.providers.map((provider) => {
            return <MenuItem>{provider.name}</MenuItem>;
          })}
        </DropdownLink>
      </OrganizationHomeContainer>
    );
  }
});

export default OrganizationRepositories;

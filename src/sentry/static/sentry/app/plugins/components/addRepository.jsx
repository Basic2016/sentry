import React from 'react';

import {
  Form,
  FormState
} from '../../components/forms';
import LoadingError from '../../components/loadingError';
import LoadingIndicator from '../../components/loadingIndicator';
import PluginComponentBase from '../../components/bases/pluginComponentBase';
import {t} from '../../locale';

class AddRepository extends PluginComponentBase {
  constructor(props) {
    super(props);

    Object.assign(this.state, {
      fieldList: null,
      loading: true,
      state: FormState.LOADING,
      error: null,
      formData: {},
    });
  }

  changeField(name, value) {
    let formData = this.state.formData;
    formData[name] = value;
    this.setState({[key]: formData});
  }

  renderForm() {
    return (
      <Form onSubmit={this.onSubmit} submitLabel={t('Add Repository')}
            footerClass="">
        {this.state.fieldList.map((field) => {
          return (
            <div key={field.name}>
              {this.renderField({
                config: field,
                formData: this.state.formData,
                onChange: this.changeField.bind(this, field.name)
              })}
            </div>
          );
        })}
      </Form>
    );
  }

  renderError() {
    if (this.state.state === FormState.ERROR && !this.state.fieldList) {
      return (
        <div className="alert alert-error m-b-1">
          {tct('An unknown error occurred. Need help with this? [link:Contact support]', {
            link: <a href="https://sentry.io/support/"/>
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.state.state === FormState.LOADING) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        {this.renderError()}
        {this.renderForm()}
      </div>
    );
  }
}

IssueActions.propTypes = {
  plugin: React.PropTypes.object.isRequired,
  actionType: React.PropTypes.oneOf(['unlink', 'link', 'create']).isRequired,
  onSuccess: React.PropTypes.func
};

export default IssueActions;

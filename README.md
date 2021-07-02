# simple-ui-react

Simple ui components in react.

## Install

```bash
npm i @ndeuja/simple-ui-react
```

## Tooltip

```jsx
import { Tooltip, TooltipContainer } from "@ndeuja/simple-ui-react";

<Tooltip text="Tooltip Content" placement="left" space={10} disabled={false}>
  Hover me
</Tooltip>;

<TooltipContainer />; // call once in root file if you are using tooltip do not call more then one time;
```

## Button

```jsx
import { Button } from "@ndeuja/simple-ui-react";

<Button
  className="myClass"
  theme="default"
  type="button"
  clicked={() => console.log("simple button was clicked!")}
  icon={""} // you add SVG icon
  text="Click me"
/>;
```

## Dialog

```jsx
import {  Dailog, DailogBody, DailogFooter, } from "@ndeuja/simple-ui-react";

<Dialog
  theme="default"
  size="md"
  close={()=>}
  open={true}
  title="Simple dialog box"
  className="myClass"
>
    <DailogBody
      className="myClass"
    >
      Dialog box body content.
    </DailogBody>
    <DailogFooter
      multiple={true}
      className="myClass"
    >
    Dialog box footer content.
    </DailogFooter>
</Dialog>
```

## Input

```jsx
import { Input, Form, CheckValidity } from "@ndeuja/simple-ui-react";

const [isValid, setIsValid] = useState(false);

const [form, setForm] = useState({
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Name",
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
    className: "myClass",
    inputStyle: {
      width: "half",
      isLast: false,
    },
  },
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password",
      showPassword: true,
      id: "password", // Id should be unique.
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
    inputStyle: {
      width: "half",
      isLast: true,
    },
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Email",
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
  },
  occupation: {
    elementType: "select",
    elementConfig: {
      placeholder: "Your occupation",
      options: [
        { id: "1", name: "Select", value: "" },
        { id: "2", name: "Developer", value: "developer" },
        { id: "3", name: "UI/UX Designer", value: "designer" },
      ],
    },
    value: "", // selected value can be options id
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  status: {
    elementType: "checkbox",
    elementConfig: {
      label: "Looking for full time job?",
      placeholder: "Yes i am!",
      labelText: "right",
    },
    value: true,
    validation: {
      required: true,
      checkbox: true,
    },
    valid: false,
    touched: false,
  },
  maritalStatus: {
    elementType: "radio",
    elementConfig: {
      placeholder: "Are you married?",
      labelText: "right",
      options: [
        { label: "Yes", value: "yes", name: "yesNo" },
        { label: "No", value: "no", name: "yesNo" },
      ],
    },
    value: "", // selected value can be options value
    validation: {},
    valid: false,
    touched: false,
  },
  file: {
    elementType: "file",
    elementConfig: {
      placeholder: "Upload CV",
      id: "upload_file",
    },
    value: "",
    validation: {},
    valid: false,
    touched: false,
  },
  feedback: {
    elementType: "textarea",
    elementConfig: {
      placeholder: "Your feedback",
      rows: 10,
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 100,
    },
    valid: false,
    touched: false,
  },
});

const inputChangeHandler = (value, controlName) => {
  let updatedForm = UpdateObject(form, {
    [controlName]: UpdateObject(form[controlName], {
      value: value,
      valid: CheckValidity(value, form[controlName].validation),
      touched: true,
    }),
  });

  let validElement = true;

  for (let inputIdentifier in updatedForm) {
    validElement = updatedForm[inputIdentifier].valid && validElement;
  }

  setForm(updatedForm);
  setIsValid(validElement);
};

const formElementsArray = [];
for (let key in form) {
  formElementsArray.push({
    id: key,
    config: form[key],
  });
}

const submitClickHandler = (event) => {
  const toSend = {};
  for (let key in form) {
    toSend[key] = form[key].value;
  }
};

return (
  <Form submit={submitClickHandler} layout="default">
    {formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        label={formElement.config.label}
        value={formElement.config.value}
        changed={(value, event) => inputChangeHandler(value, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation ? true : false}
        touched={formElement.config.touched}
        className={formElement.config.className}
        inputStyle={formElement.config.inputStyle}
      />
    ))}
  </Form>
);
```

## Author

Nimesh Deuja

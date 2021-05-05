import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";


const CURRENT_THEME = {
  background: "#111D23",
  el1: "#1B262C",
  el2: "#263137",
  el3: "#3C464B",
  text: "#210124",
  textInv: "#F0EDEE",
  main: "#019EE2",
  secondary: "#4DBBEB",
  mainShadow: "#13232B",
  danger: "#DB162F",
  warning: "",
  font1: `"Roboto Slab", "Times New Roman", serif`,
  font2: `"Roboto light"`
};

const styles = {
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: CURRENT_THEME.el3,
    borderColor: CURRENT_THEME.danger
  },
  inputIcons: {
    padding: 2,
    color: CURRENT_THEME.textInv
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: CURRENT_THEME.textInv
  }
};

const useStyles = makeStyles(styles);
const StyledDateTime = withStyles({
  "& .MuiPickersToolbar-toolbar": {
    backgroundColor: CURRENT_THEME.textInv
  },
  root: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: CURRENT_THEME.textInv,
        "& .MuiPickersToolbar-toolbar": {
          backgroundColor: CURRENT_THEME.textInv
        }
      }
    }
  }
})(KeyboardDateTimePicker);

const CssTextField = withStyles({
  root: {
    //all
    "& .MuiIconButton-root": {
      color: CURRENT_THEME.textInv
    },
    // filled
    "& .MuiFilledInput-underline": {
      "&:before": {
        borderBottomColor: "transparent"
      },
      "&:after": {
        borderBottomColor: "transparent"
      }
    },
    "& .MuiFilledInput-input": {
      color: CURRENT_THEME.textInv
      // borderRadius: "50px 50px 0 0"
    },
    "& .MuiFilledInput-root": {
      borderRadius: "10px 10px 10px 10px",
      backgroundColor: CURRENT_THEME.el3,
      // boxShadow: "0px 0px 15px 0px rgb(26,181,225, 0.5)"
      "&.Mui-focused": {
        borderColor: "#1ab5e1",
        backgroundColor: CURRENT_THEME.el2,
        // boxShadow: "0px 0px 15px 0px rgb(26,181,225, 0.5)"
        boxShadow: `0px 0px 10px 0px ${CURRENT_THEME.main}, 0px 0px 40px 0px ${CURRENT_THEME.main}, 0px 0px 80px 0px ${CURRENT_THEME.main}`
        // boxShadow: '0px 0px 15px 0px #1ab5e1, 0px 0px 15px 0px #1ab5e1'
      }
    },

    "& .MuiInputLabel-formControl": {
      color: CURRENT_THEME.textInv
    }
    // "& .MuiOutlinedInput-input": {
    //   color: CURRENT_THEME.textInv
    // },
    // "& .MuiOutlinedInput-root": {
    //   "& fieldset": {
    //     borderColor: "#1ab5e1",
    //     // color: "#1ab5e1"
    //   },
    //   "& label": {
    //     color: CURRENT_THEME.textInv
    //   },
    //   "&:hover fieldset": {
    //     borderColor: "#1ab5e1"
    //   },
    //   "&.Mui-focused fieldset": {
    //     borderColor: "#1ab5e1",
    //     boxShadow: "0px 0px 15px 0px rgb(26,181,225, 0.5)"
    //   }
    // }
  }
})(TextField);

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: CURRENT_THEME.main
    }
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: CURRENT_THEME.el3
      }
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: "transparent",
        color: CURRENT_THEME.main
      },
      dayLabel: {
        color: CURRENT_THEME.textInv //days in calendar
      },
      transitionContainer: {
        color: CURRENT_THEME.textInv
      }
    },
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: CURRENT_THEME.background
      }
      //   backgroundColor: CURRENT_THEME.el3,
    },
    MuiPickersDay: {
      day: {
        color: CURRENT_THEME.textInv //days in calendar
      }
      //   daySelected: {
      //     backgroundColor: CURRENT_THEME.main, //calendar circle
      //   },
      //   dayDisabled: {
      //     color: CURRENT_THEME.main, // current day
      //   },
      //   current: {
      //     color: CURRENT_THEME.main,
      //   },
    },
    // MuiButton:{
    //   textPrimary:{
    //     color: CURRENT_THEME.main,
    //   }
    // },

    MuiDialogActions: {
      root: {
        backgroundColor: CURRENT_THEME.background
      }
    },
    MuiPickersClock: {
      clock: {
        backgroundColor: CURRENT_THEME.el2
      }
      //   pin:{
      //     backgroundColor: CURRENT_THEME.main,
      //   },
      // },
      // MuiPickersClockPointer:{
      //   pointer:{
      //     backgroundColor: CURRENT_THEME.main,
      //   },
    },
    MuiPickersClockNumber: {
      clockNumber: {
        color: CURRENT_THEME.textInv
      }
      //   numberSelected: {
      //     backgroundColor: CURRENT_THEME.main, //calendar circle
      //   },
    }
    // MuiMuiPickersTime:{
    //   timeSelected: {
    //     backgroundColor: CURRENT_THEME.main, //calendar circle
    //   },
    // },
    // MuiPickersModal: {
    //   dialogAction: {
    //     color: CURRENT_THEME.main, //no se
    //     backgroundColor: CURRENT_THEME.el3,
    //   },
    // },
  }
});

function DateTimeSelect(props) {
  const [myDate, setmyDate] = useState();

  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="dateTimeSelect">
          <KeyboardDateTimePicker
            format={'dd-MMM-yyyy'}
            label="Choose date and time for event"
            inputVariant="filled"
            helperText=""
            TextFieldComponent={CssTextField}
            size="small"
            value={myDate}
            onChange={setmyDate}
            //change the 'dateTime' state of the parent from the child
            onClick={props.changeDate(myDate)}
          />
          </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
export default DateTimeSelect
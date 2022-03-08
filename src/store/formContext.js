import { createContext, useCallback } from 'react';
import { useReducer, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CollectInfoContext } from './collectInfoContext';
// import useSubmit from '../hooks/use-submit';

// validations for Skills page
export const SkillsContext = createContext({
  skillTitle: 'Skill',
  skillSelected: false,
  skillIsTouched: false,
  years: '',
  yearIsValid: false,
  yearIsTouched: false,
  pageIsValid: false,
  skillsArray: [],
  yearChanger: (e) => {},
  titleChanger: (e) => {},
  removeLanguage: (title) => {},
  addLanguage: (e) => {},
  skills: [],
  removedList: [],
  skillsInfo: {},
  submitPage: () => {},
  pageSubmitted: false,
});

const skillsYearsReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload,
      isValid: action.payload !== '',
      isTouched: true,
    };
  }
  if (action.type === 'ERROR') {
    return { value: state.value, isValid: false, isTouched: true };
  }
  if (action.type === 'CLEAR') {
    return { value: '', isValid: true, isTouched: false };
  }
  return { value: '', isValid: false, isTouched: false };
};

const skillsTitleReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload,
      isSelected: true,
      isTouched: true,
    };
  }
  if (action.type === 'ERROR') {
    return { value: state.value, isSelected: false, isTouched: true };
  }

  if (action.type === 'CLEAR') {
    return { value: 'Skills', isSelected: false, isTouched: false };
  }
  return { value: 'Skills', isSelected: false, isTouched: false };
};

const skillsValidityReducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      skillsPageIsValid: state.skillsArray.length + 1 > 0,
      skillsArray: [...state.skillsArray, action.payload],
      submitted: false,
    };
  }

  if (action.type === 'SUBMIT') {
    return {
      skillsPageIsValid: state.skillsArray.length > 0,
      skillsArray: state.skillsArray,
      submitted: true,
    };
  }
  if (action.type === 'REMOVE') {
    return {
      skillsArray: state.skillsArray.filter(
        (skill) => skill !== action.payload
      ),
      skillsPageIsValid: state.skillsArray.length - 1 > 0,
      submitted: false,
    };
  }
  return { skillsPageIsValid: false, skillsArray: [], submitted: false };
};

export const SkillsProvider = ({ children }) => {
  //   const infoCtx = useContext(CollectInfoContext);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get('https://bootcamp-2022.devtest.ge/api/skills')
      .then((response) => {
        setSkills(response.data);
      });
  }, []);
  const [removedList, setRemovedList] = useState([]);

  const [titleState, dispatchTitle] = useReducer(skillsTitleReducer, {
    value: 'Skills',
    isSelected: false,
    isTouched: false,
  });

  const [yearState, dispatchYear] = useReducer(skillsYearsReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const [skillsValidityState, dispatchSkillsValidity] = useReducer(
    skillsValidityReducer,
    { skillsPageIsValid: false, skillsArray: [], submitted: false }
  );

  const addLanguage = (e) => {
    e.preventDefault();
    if (
      skills.length > 0 &&
      yearState.value !== '' &&
      titleState.value !== 'Skills'
    ) {
      const skillsObj = { title: titleState.value, years: yearState.value };

      dispatchSkillsValidity({ type: 'ADD', payload: skillsObj });

      const editedSkills = [...skills];
      const removed = editedSkills.splice(
        editedSkills.indexOf(
          editedSkills.find((skill) => skill.title === skillsObj.title)
        ),
        1
      );
      const removedObjects = removedList.slice();
      setRemovedList([...removedObjects, removed]);
      setSkills(editedSkills);
      dispatchTitle({ type: 'CLEAR' });
      dispatchYear({ type: 'CLEAR' });
    } else if (!yearState.value && titleState.value === 'Skills') {
      dispatchYear({ type: 'ERROR' });
      dispatchTitle({ type: 'ERROR' });
    } else if (!yearState.isValid) {
      dispatchYear({ type: 'ERROR' });
    } else if (!titleState.isSelected) {
      dispatchTitle({ type: 'ERROR' });
    }
  };

  const removeLanguage = (title) => {
    const fromRemoved = removedList.filter(
      (skill) => skill[0].title === title
    )[0][0];
    const toRemove = skillsValidityState.skillsArray.find(
      (skill) => skill.title === fromRemoved.title
    );

    dispatchSkillsValidity({
      type: 'REMOVE',
      payload: toRemove,
    });
  };
  const yearChanger = (e) => {
    dispatchYear({ type: 'USER_INPUT', payload: e.target.value });
  };

  const titleChanger = (e) => {
    dispatchTitle({ type: 'USER_INPUT', payload: e.target.value });
  };
  const infoCtx = useContext(CollectInfoContext);
  const skillsInfo = { skills: removedList.map((e) => e[0]) };

  const submitPage = useCallback(() => {
    dispatchSkillsValidity({ type: 'SUBMIT' });
  }, []);

  // useCallback(useSubmit(skillsInfo), [skillsInfo]);

  const skillsContext = {
    skillTitle: titleState.value,
    skillSelected: titleState.isSelected,
    skillIsTouched: titleState.isTouched,
    years: yearState.value,
    yearIsValid: yearState.isValid,
    yearIsTouched: yearState.isTouched,
    pageIsValid: skillsValidityState.skillsPageIsValid,
    skillsArray: skillsValidityState.skillsArray,
    pageSubmitted: skillsValidityState.submitted,
    yearChanger,
    titleChanger,
    removeLanguage,
    addLanguage,
    skills,
    removedList,
    submitPage,
    skillsInfo,
  };
  return (
    <SkillsContext.Provider value={{ skillsContext }}>
      {children}
    </SkillsContext.Provider>
  );
};

//validations for Persoonal Info page

export const PersonalInfoContext = createContext({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  firstNameIsValid: false,
  lastNameIsValid: false,
  emailIsValid: false,
  phoneIsValid: true,
  pageIsValid: false,
  isSubmitted: false,
  firstNameIsTouched: false,
  lastNameIsTouched: false,
  emailIsTouched: false,
  changeEmail: (e) => {},
  changeFirstName: (e) => {},
  changePhone: (e) => {},
  changeLastName: (e) => {},
  emailBlur: () => {},
  firstNameBlur: () => {},
  lastNameBlur: () => {},
  phoneBlur: () => {},
  submitPage: () => {},
  phoneIsTouched: false,
});

const personalInfoReducer = (state, action) => {
  if (action.type === 'FIRST_NAME_INPUT') {
    return {
      ...state,
      first_name: action.payload,
    };
  }
  if (action.type === 'FIRST_NAME_BLUR') {
    return {
      ...state,
      firstNameIsValid: state.first_name.length >= 2,
      firstNameIsTouched: true,
      pageIsValid:
        state.first_name.length >= 2 &&
        state.lastNameIsValid &&
        state.phoneNumberIsValid &&
        state.emailIsValid,
    };
  }
  if (action.type === 'LAST_NAME_INPUT') {
    return {
      ...state,
      last_name: action.payload,
    };
  }
  if (action.type === 'LAST_NAME_BLUR') {
    return {
      ...state,
      lastNameIsValid: state.last_name.length >= 2,
      lastNameIsTouched: true,
      pageIsValid:
        state.last_name.length >= 2 &&
        state.firstNameIsValid &&
        state.phoneNumberIsValid &&
        state.emailIsValid,
    };
  }
  if (action.type === 'EMAIL_INPUT') {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === 'EMAIL_BLUR') {
    return {
      ...state,
      emailIsTouched: true,
      pageIsValid:
        !!state.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]/g) &&
        state.firstNameIsValid &&
        state.phoneNumberIsValid &&
        state.lastNameIsValid,

      emailIsValid: !!state.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]/g),
    };
  }

  if (action.type === 'PHONE_INPUT') {
    return { ...state, phone: action.payload };
  }
  if (action.type === 'PHONE_BLUR') {
    return {
      ...state,
      phoneIsTouched: true,
      phoneNumberIsValid:
        state.phone.length > 0
          ? !!state.phone.match(
              /^(?:(?:\+)995[\s.-]{0,1}(?:\(0\)[\s.-]{0,1})?)[5](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm
            )
          : true,
      pageIsValid:
        (state.phone.length > 0
          ? !!state.phone.match(
              /^(?:(?:\+)995[\s.-]{0,1}(?:\(0\)[\s.-]{0,1})?)[5](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm
            )
          : true) &&
        state.emailIsValid &&
        state.firstNameIsValid &&
        state.lastNameIsValid,
    };
  }

  if (action.type === 'SUBMIT') {
    return {
      ...state,
      pageIsValid:
        state.firstNameIsValid &&
        state.lastNameIsValid &&
        state.phoneNumberIsValid &&
        state.emailIsValid,
    };
  }

  return {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    firstNameIsValid: false,
    lastNameIsValid: false,
    emailIsValid: false,
    phoneNumberIsValid: true,
    isSubmitted: false,
    firstNameIsTouched: false,
    lastNameIsTouched: false,
    emailIsTouched: false,
    phoneIsTouched: false,
    pageIsValid: false,
  };
};

export const PersonalInfoProvider = ({ children }) => {
  const [personalInfoState, dispatchPersonalInfo] = useReducer(
    personalInfoReducer,
    {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      firstNameIsValid: false,
      lastNameIsValid: false,
      emailIsValid: false,
      phoneNumberIsValid: true,
      isSubmitted: false,
      firstNameIsTouched: false,
      lastNameIsTouched: false,
      emailIsTouched: false,
      phoneIsTouched: false,
      pageIsValid: false,
    }
  );

  const changeEmail = (e) => {
    dispatchPersonalInfo({ type: 'EMAIL_INPUT', payload: e.target.value });
  };
  const emailBlur = () => {
    dispatchPersonalInfo({ type: 'EMAIL_BLUR' });
  };
  const changeFirstName = (e) => {
    dispatchPersonalInfo({ type: 'FIRST_NAME_INPUT', payload: e.target.value });
  };
  const firstNameBlur = (e) => {
    dispatchPersonalInfo({ type: 'FIRST_NAME_BLUR' });
  };
  const changePhone = (e) => {
    dispatchPersonalInfo({ type: 'PHONE_INPUT', payload: e.target.value });
  };
  const phoneBlur = () => {
    dispatchPersonalInfo({ type: 'PHONE_BLUR' });
  };
  const changeLastName = (e) => {
    dispatchPersonalInfo({ type: 'LAST_NAME_INPUT', payload: e.target.value });
  };
  const lastNameBlur = () => {
    dispatchPersonalInfo({ type: 'LAST_NAME_BLUR' });
  };

  const submitPage = () => {
    if (
      personalInfoState.emailIsValid &&
      personalInfoState.phoneNumberIsValid &&
      personalInfoState.firstNameIsValid &&
      personalInfoState.lastNameIsValid
    ) {
      dispatchPersonalInfo({ type: 'SUBMIT' });
    }
  };
  const personalContext = {
    first_name: personalInfoState.first_name,
    last_name: personalInfoState.last_name,
    email: personalInfoState.email,
    phone: personalInfoState.phone,
    firstNameIsValid: personalInfoState.firstNameIsValid,
    lastNameIsValid: personalInfoState.lastNameIsValid,
    emailIsValid: personalInfoState.emailIsValid,
    phoneNumberIsValid: personalInfoState.phoneNumberIsValid,
    changeEmail,
    changeFirstName,
    changePhone,
    changeLastName,
    emailBlur,
    firstNameBlur,
    lastNameBlur,
    phoneBlur,
    submitPage,
    isSubmitted: personalInfoState.isSubmitted,
    firstNameIsTouched: personalInfoState.firstNameIsTouched,
    lastNameIsTouched: personalInfoState.lastNameIsTouched,
    emailIsTouched: personalInfoState.emailIsTouched,
    phoneIsTouched: personalInfoState.phoneIsTouched,
    pageIsValid: personalInfoState.pageIsValid,
  };
  return (
    <PersonalInfoContext.Provider value={{ personalContext }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export const CovidContext = createContext({
  workType: '',
  workTypeIsChosen: false,
  hadCovid: null,
  covidDate: '',
  isVaccinated: null,
  vaccineDate: '',
  workTypeChanger: (e) => {},
  hadCovidChanger: (e) => {},
  isVaccinedChanger: (e) => {},
  covidDateChanger: (e) => {},
  vaccineDateChanger: (e) => {},
  pageIsValid: false,
});

const covidPageReducer = (state, action) => {
  return {
    workType: '',
    workTypeIsChosen: false,
    hadCovid: null,
    covidDate: '',
    isVaccinated: null,
    vaccineDate: '',
    pageIsValid: false,
  };
};

const CovidPageProvider = ({ children }) => {
  const [covidPageState, dispatchCovidState] = useReducer(covidPageReducer, {
    workType: '',
    workTypeIsChosen: false,
    hadCovid: null,
    covidDate: '',
    isVaccinated: null,
    vaccineDate: '',
    pageIsValid: false,
  });

  const covidContext = {
    workType: covidPageState.workType,
    workTypeIsChosen: covidPageState.workTypeIsChosen,
    hadCovid: covidPageState.hadCovid,
    covidDate: covidPageState.covidDate,
    isVaccinated: covidPageState.isVaccinated,
    vaccineDate: covidPageState.vaccineDate,
    pageIsValid: covidPageState.pageIsValid,
  };

  return (
    <CovidContext.Provider value={{ covidContext }}>
      {children}
    </CovidContext.Provider>
  );
};

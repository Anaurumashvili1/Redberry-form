import { createContext, useCallback } from 'react';
import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
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
    setRemovedList(removedList.filter((obj) => obj[0] !== fromRemoved));
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
  const removedListMapped = removedList.map((e) => e[0]);

  const skillsInfo = removedListMapped.map((e, i) => ({
    id: e.id,
    experience: parseInt(skillsValidityState.skillsArray[i].years),
  }));

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
  const firstNameBlur = () => {
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
  submitPage: () => {},
  pageIsValid: false,
  workTypeIsValid: false,
  hadCovidIsValid: true,
  covidDateIsValid: false,
  isVaccinatedIsValid: false,
  vaccineDateIsValid: false,
  isSubmitted: false,
});

const covidPageReducer = (state, action) => {
  if (action.type === 'WORK_INPUT') {
    return {
      ...state,
      workType: action.payload,
      workTypeIsValid: true,
      pageIsValid:
        state.isVaccinatedIsValid &&
        state.hadCovidIsValid &&
        state.covidDateIsValid &&
        state.vaccineDateIsValid,
    };
  }

  if (action.type === 'COVID_INPUT') {
    return {
      ...state,
      hadCovid: action.payload,
      covidDate: action.payload === 'no' && null,
      hadCovidIsValid: true,
      covidDateIsValid: action.payload === 'yes' ? false : true,
      pageIsValid:
        state.workTypeIsValid &&
        state.isVaccinatedIsValid &&
        action.payload === 'yes'
          ? false
          : true && state.vaccineDateIsValid,
    };
  }

  if (action.type === 'VACCINE_INPUT') {
    return {
      ...state,
      isVaccinated: action.payload,
      isVaccinatedIsValid: true,
      vaccineDate: action.payload === 'no' && null,
      vaccineDateIsValid: action.payload === 'yes' ? false : true,
      pageIsValid:
        state.isVaccinatedIsValid &&
        state.hadCovidIsValid &&
        state.covidDateIsValid &&
        action.payload === 'yes'
          ? false
          : true && state.workTypeIsValid,
    };
  }
  if (action.type === 'COVID_DATE') {
    return {
      ...state,
      covidDate: action.payload,
      covidDateIsValid: action.payload !== '',
      pageIsValid:
        state.isVaccinatedIsValid &&
        state.hadCovidIsValid &&
        state.vaccineDateIsValid &&
        state.workTypeIsValid &&
        action.payload !== '',
    };
  }
  if (action.type === 'VACCINE_DATE') {
    return {
      ...state,
      vaccineDate: action.payload,
      vaccineDateIsValid: action.payload !== '',
      pageIsValid:
        state.isVaccinatedIsValid &&
        state.hadCovidIsValid &&
        action.payload !== '' &&
        state.workTypeIsValid &&
        action.payload !== '',
    };
  }

  if (action.type === 'SUBMIT') {
    return {
      ...state,
      isSubmitted: true,
      pageIsValid: true,
    };
  }

  return {
    workType: '',
    hadCovid: null,
    covidDate: '',
    isVaccinated: null,
    vaccineDate: '',
    workTypeIsValid: false,
    hadCovidIsValid: false,
    covidDateIsValid: true,
    isVaccinatedIsValid: false,
    vaccineDateIsValid: true,
    pageIsValid: false,
    isSubmitted: false,
  };
};

export const CovidPageProvider = ({ children }) => {
  const [covidPageState, dispatchCovidState] = useReducer(covidPageReducer, {
    workType: '',
    workTypeIsChosen: false,
    hadCovid: null,
    covidDate: '',
    isVaccinated: null,
    vaccineDate: '',
    pageIsValid: false,
  });
  const workTypeChanger = (e) => {
    dispatchCovidState({ type: 'WORK_INPUT', payload: e.target.value });
  };

  const hadCovidChanger = (e) => {
    dispatchCovidState({ type: 'COVID_INPUT', payload: e.target.value });
  };

  const isVaccinedChanger = (e) => {
    dispatchCovidState({ type: 'VACCINE_INPUT', payload: e.target.value });
  };

  const covidDateChanger = (e) => {
    dispatchCovidState({ type: 'COVID_DATE', payload: e.target.value });
  };

  const vaccineDateChanger = (e) => {
    dispatchCovidState({ type: 'VACCINE_DATE', payload: e.target.value });
  };

  const submitPage = () => {
    if (
      covidPageState.workTypeIsValid &&
      covidPageState.hadCovidIsValid &&
      covidPageState.isVaccinatedIsValid &&
      covidPageState.vaccineDateIsValid &&
      covidPageState.covidDateIsValid
    ) {
      dispatchCovidState({ type: 'SUBMIT' });
    }
  };

  const covidContext = {
    workType: covidPageState.workType,
    workTypeIsChosen: covidPageState.workTypeIsChosen,
    hadCovid: covidPageState.hadCovid,
    covidDate: covidPageState.covidDate,
    isVaccinated: covidPageState.isVaccinated,
    vaccineDate: covidPageState.vaccineDate,
    pageIsValid: covidPageState.pageIsValid,
    workTypeIsValid: covidPageState.workTypeIsValid,
    hadCovidIsValid: covidPageState.hadCovidIsValid,
    covidDateIsValid: covidPageState.covidDateIsValid,
    isVaccinatedIsValid: covidPageState.isVaccinatedIsValid,
    vaccineDateIsValid: covidPageState.vaccineDateIsValid,
    workTypeChanger,
    hadCovidChanger,
    isVaccinedChanger,
    covidDateChanger,
    vaccineDateChanger,
    submitPage,
    isSubmitted: covidPageState.isSubmitted,
  };

  return (
    <CovidContext.Provider value={{ ...covidContext }}>
      {children}
    </CovidContext.Provider>
  );
};

export const InsightsContext = createContext({
  will_organize_devtalk: null,
  devtalk_topic: '',
  something_special: '',
  pageIsValid: false,
  willOrganizeIsValid: false,
  topicIsValid: true,
  specialIsValid: false,
  submitPage: () => {},
  changeWillOrganize: (e) => {},
  changeTopic: (e) => {},
  changeSpecial: (e) => {},
});

const insightsReducer = (state, action) => {
  if (action.type === 'INPUT_ORGANIZE') {
    return {
      ...state,
      will_organize_devtalk: action.payload,
      willOrganizeIsValid: true,
      pageIsValid: state.topicIsValid && state.specialIsValid,
      topicIsValid: action.payload === 'yes' ? false : true,
    };
  }
  if (action.type === 'INPUT_TOPIC') {
    return {
      ...state,
      devtalk_topic: action.payload,
      topicIsValid: action.payload.length > 0,
      pageIsValid:
        state.willOrganizeIsValid &&
        state.specialIsValid &&
        action.payload.length > 0,
    };
  }

  if (action.type === 'INPUT_SPECIAL') {
    return {
      ...state,
      something_special: action.payload,
      specialIsValid: action.payload.length > 0,
      pageIsValid:
        state.willOrganizeIsValid &&
        action.payload.length > 0 &&
        state.topicIsValid,
    };
  }
  if (action.type === 'SUBMIT') {
    return { ...state, isSubmitted: true };
  }
  return {
    will_organize_devtalk: null,
    devtalk_topic: '',
    something_special: '',
    pageIsValid: false,
    willOrganizeIsValid: false,
    topicIsValid: false,
    specialIsValid: false,
    isSubmitted: false,
  };
};
export const InsightsProvider = ({ children }) => {
  const [insightsState, dispatchInsights] = useReducer(insightsReducer, {
    will_organize_devtalk: null,
    devtalk_topic: '',
    something_special: '',
    pageIsValid: false,
    willOrganizeIsValid: false,
    topicIsValid: true,
    specialIsValid: false,
    isSubmitted: false,
  });

  const changeWillOrganize = (e) => {
    dispatchInsights({ type: 'INPUT_ORGANIZE', payload: e.target.value });
  };
  const changeTopic = (e) => {
    dispatchInsights({ type: 'INPUT_TOPIC', payload: e.target.value });
  };
  const changeSpecial = (e) => {
    dispatchInsights({ type: 'INPUT_SPECIAL', payload: e.target.value });
  };
  const submitPage = () => {
    dispatchInsights({ type: 'SUBMIT' });
  };

  const insightsContext = {
    submitPage,
    changeWillOrganize,
    changeTopic,
    changeSpecial,
    will_organize_devtalk: insightsState.will_organize_devtalk,
    devtalk_topic: insightsState.devtalk_topic,
    something_special: insightsState.something_special,
    pageIsValid: insightsState.pageIsValid,
    willOrganizeIsValid: insightsState.willOrganizeIsValid,
    topicIsValid: insightsState.topicIsValid,
    specialIsValid: insightsState.specialIsValid,
    isSubmitted: insightsState.isSubmitted,
  };

  return (
    <InsightsContext.Provider value={{ ...insightsContext }}>
      {children}
    </InsightsContext.Provider>
  );
};

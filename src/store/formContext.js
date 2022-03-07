import { createContext, useCallback } from 'react';
import { useReducer, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CollectInfoContext } from './collectInfoContext';
// import useSubmit from '../hooks/use-submit';

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

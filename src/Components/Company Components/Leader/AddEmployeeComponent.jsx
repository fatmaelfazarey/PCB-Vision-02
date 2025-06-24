import React, { useState, useRef, lazy, useContext, useEffect } from 'react';
import { assets } from '../../../assets/assets';
import { AddNewEmployee, GetAnEmployee, EditEmployee } from '../../../Services/CompanyServices';
import { CompanyContext } from '../../../Context/CompanyContext';
import { useParams } from 'react-router-dom';
const Toast = lazy(() => import('../../../Shared/Toast/Toast'));

const AddEmployeeComponent = () => {
  const { isEmployeeEditMode, editEmployee, setIsEmployeeEditMode } = useContext(CompanyContext);
  const [formData, setFormData] = useState({
    Image: "",
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    Role_ID: "",
    Line_ID: ""
  });
  const { EditEmployeeId } = useParams();
  // const [isEdit, setIsLoading] = useState(false);

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        // Case 1: Employee data passed directly via props (from location state)
        if (EditEmployeeId && editEmployee && isEmployeeEditMode) {
          setFormData({
            Image: editEmployee.image || '',
            Name: editEmployee.name || '',
            Email: editEmployee.email || '',
            Phone: editEmployee.phone || '',
            Password: editEmployee.password || '',
            Role_ID: editEmployee.roleName || '',
            Line_ID: editEmployee.line_ID || ''
          });
          return;
        }

        // Case 2: Employee ID from URL params - fetch data
        if (EditEmployeeId) {
          setIsEmployeeEditMode(true);
          const employeeData = await GetAnEmployee(EditEmployeeId);
          if (employeeData) {
            setFormData({
              Image: employeeData.Image || '',
              Name: employeeData.Name || '',
              Email: employeeData.Email || '',
              Phone: employeeData.Phone || '',
              Password: employeeData.Password || '',
              Role_ID: employeeData.Role_ID || '',
              Line_ID: employeeData.Line_ID || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading employee data:', error);
        // Handle error (show toast message, etc.)
      }
    };

    loadEmployeeData();
  }, [editEmployee, isEmployeeEditMode, EditEmployeeId]);


  const [errors, setErrors] = useState({});
  const roleDropdownRef = useRef(null);
  const lineIdDropdownRef = useRef(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLineIdDropdownOpen, setIsLineIdDropdownOpen] = useState(false);


  //#region  Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };
  //#endregion

  // Constants
  const RoleOptions = [
    { value: 'Operator', label: 'Operator' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Leader', label: 'Leader' }
  ];

  const LineIdOptions = [
    { value: 'LINE-12345', label: 'LINE-12345' },
    { value: 'LINE-24680', label: 'LINE-24680' }
  ];

  // Validation patterns
  const validationPatterns = {
    Email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    Phone: /^01\d{9}$/,
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    usernameRegex: /^\S+$/
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, Role_ID: value }));
  };

  const handleLineIdChange = (value) => {
    setFormData(prev => ({ ...prev, Line_ID: value }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // if (!formData.Name.trim()) newErrors.Name = "Name is required";
    if (!validationPatterns.usernameRegex.test(formData.Name)) newErrors.Name = "Username should not contain spaces";
    if (!validationPatterns.Email.test(formData.Email))
      newErrors.Email = "Invalid Email format (userName@example.com)";
    if (formData.Phone && !validationPatterns.Phone.test(formData.Phone))
      newErrors.Phone = "Egyptian phone number must be 11 digits starting with 01";
    if (!validationPatterns.Password.test(formData.Password))
      newErrors.Password = "Password must be 8+ chars with uppercase, lowercase, number, and special character";
    if (!formData.Role_ID) newErrors.Role_ID = "Please select a Role";
    if (!formData.Line_ID) newErrors.Line_ID = "Please select a Line ID";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEmployeeEditMode) {

        EditEmployee(EditEmployeeId, formData)
        handleShowToast('An employee has been updated successfully.')


      } else {
        AddNewEmployee(formData)
        handleShowToast('A new employee has been added successfully.')
      }

      // Reset form
      setFormData({
        Image: "",
        Name: "",
        Email: "",
        Phone: "",
        Password: "",
        Role_ID: "",
        Line_ID: ""
      });
    }
  };

  return (
    <div className='max-w-screen-xl mx-auto '>
      {/* <h1 className='font-medium text-2xl text-black dark:text-white mb-6'>Add Employee</h1> */}
      <h3 className="text-[--page-title] font-medium text-[1.375rem] leading-[27.72px] m-0 p-0 mb-6">
        {isEmployeeEditMode ? 'Edit Employee' : 'Add Employee'}
      </h3>
      {/* Show Toast if visible */}
      {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}

      <form onSubmit={handleSubmit} className="space-y-6 shadow-lg rounded-xl ">
        {/* Image Section */}
        <div className="space-y-2">
          <div className='flex flex-row gap-4 items-end'>
            <img
              loading='lazy'
              src={formData.Image || assets.add_user}
              alt='user'
              className='w-52 h-52  rounded-xl bg-second dark:bg-second-dark dark:text-white'
              onError={(e) => {
                e.target.src = assets.add_user;
                setErrors({ ...errors, Image: "Could not load image" });
              }}
            />
            <div className="flex-1">
              <label className="block text-sm font-medium text-title mb-1">Image URL</label>
              <input
                type='text'
                name="Image"
                value={formData.Image}
                onChange={handleChange}
                placeholder="Paste image URL here"
                className='w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded focus:outline-main dark:text-white'
              />
            </div>
          </div>
          {errors.Image && (
            <p className="text-red-500 text-xs">
              {errors.Image}
            </p>
          )}
        </div>

        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className='space-y-1'>
            <label htmlFor="Name" className="block text-sm font-medium text-title">User Name <span className='text-red-500'>*</span></label>
            <input
              id='Name'
              name="Name"
              type='text'
              value={formData.Name}
              onChange={handleChange}
              className={`w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded ${errors.Name ? 'border-red-500' : 'focus:outline-main'}`}
            />
            {errors.Name && <p className="text-red-500 text-xs">{errors.Name}</p>}
          </div>

          {/* Phone Field */}
          <div className='space-y-1'>
            <label htmlFor="Phone" className="block text-sm font-medium text-title">Phone </label>
            <input
              id='Phone'
              name="Phone"
              type='tel'
              value={formData.Phone}
              onChange={handleChange}
              className={`w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded ${errors.Phone ? 'border-red-500' : 'focus:outline-main'}`}
              placeholder="01XXXXXXXXX"
            />
            {errors.Phone && <p className="text-red-500 text-xs">{errors.Phone}</p>}
          </div>

          {/* Email Field */}
          <div className='space-y-1'>
            <label htmlFor="Email" className="block text-sm font-medium text-title">Email <span className='text-red-500'>*</span></label>
            <input
              id='Email'
              name="Email"
              type='email'
              value={formData.Email}
              onChange={handleChange}
              className={`w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded ${errors.Email ? 'border-red-500' : 'focus:outline-main'}`}
              placeholder="user@example.com"
            />
            {errors.Email && <p className="text-red-500 text-xs">{errors.Email}</p>}
          </div>

          {/* Password Field */}
          <div className='space-y-1'>
            <label htmlFor="Password" className="block text-sm font-medium text-title">Password <span className='text-red-500'>*</span></label>
            <input
              id='Password'
              name="Password"
              type='text'
              value={formData.Password}
              onChange={handleChange}
              className={`w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded ${errors.Password ? 'border-red-500' : 'focus:outline-main'}`}
            />
            {errors.Password && <p className="text-red-500 text-xs">{errors.Password}</p>}
          </div>

          {/* Role Dropdown */}
          <div className='space-y-1'>
            <label className="block text-sm font-medium text-title">Role <span className='text-red-500'>*</span></label>
            <div
              className={`w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded cursor-pointer relative ${errors.Role_ID ? 'border-red-500' : 'focus:outline-main'}`}
              ref={roleDropdownRef}
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            >
              <div className="flex justify-between items-center">
                <span>{formData.Role_ID || "Select Role"}</span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`}
                  fill="#777777"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {isRoleDropdownOpen && (
                <div className="absolute left-0 z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                  {RoleOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${formData.Role_ID === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                      onClick={() => {
                        handleRoleChange(option.value);
                        setIsRoleDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.Role_ID && <p className="text-red-500 text-xs">{errors.Role_ID}</p>}
          </div>

          {/* Line ID Dropdown */}
          <div className='space-y-1'>
            <label className="block text-sm font-medium text-title">Line ID <span className='text-red-500'>*</span></label>
            <div
              className={`w-full p-2 bg-second dark:bg-second-dark dark:text-white rounded cursor-pointer relative ${errors.Line_ID ? 'border-red-500' : 'focus:outline-main'}`}
              ref={lineIdDropdownRef}
              onClick={() => setIsLineIdDropdownOpen(!isLineIdDropdownOpen)}
            >
              <div className="flex justify-between items-center">
                <span>{formData.Line_ID || "Select Line ID"}</span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${isLineIdDropdownOpen ? 'rotate-180' : ''}`}
                  fill="#777777"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {isLineIdDropdownOpen && (
                <div className="absolute left-0 z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                  {LineIdOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${formData.Line_ID === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                      onClick={() => {
                        handleLineIdChange(option.value);
                        setIsLineIdDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.Line_ID && <p className="text-red-500 text-xs">{errors.Line_ID}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-main text-white py-2 px-6 rounded-lg hover:bg-main-dark transition-colors"
          >
            {isEmployeeEditMode ? "Edit Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeComponent;
"use client";

import { 
  Button, 
  Header, 
  InputField, 
  UploadFileInput, 
  Modal, 
  Loading, 
  SearchBar, 
  Dropdown, 
  DatePicker, 
  RoleRedirectWrapper 
} from "@/components";
import { 
  CircleLoader, 
  DeleteModal, 
  SearchIcon, 
  MenuIcon, 
  UserIcon 
} from "@/design-system";
import { useState } from "react";

export default function ReusableComponentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dropdownValue, setDropdownValue] = useState("");

  const dropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Reusable Components Showcase</h1>
        
        {/* Design System Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Design System Components</h2>
          
          {/* Loaders */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Loaders</h3>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <CircleLoader />
                <span className="text-sm text-gray-600 mt-2">CircleLoader</span>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Icons</h3>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <SearchIcon className="w-8 h-8 text-blue-600" />
                <span className="text-sm text-gray-600 mt-2">SearchIcon</span>
              </div>
              <div className="flex flex-col items-center">
                <MenuIcon className="w-8 h-8 text-green-600" />
                <span className="text-sm text-gray-600 mt-2">MenuIcon</span>
              </div>
              <div className="flex flex-col items-center">
                <UserIcon className="w-8 h-8 text-purple-600" />
                <span className="text-sm text-gray-600 mt-2">UserIcon</span>
              </div>
            </div>
          </div>

          {/* Modals */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Modals</h3>
            <div className="flex gap-4">
              <Button 
                onClick={() => setIsDeleteModalOpen(true)}
                variant="primary"
                title="Open Delete Modal"
              />
            </div>
          </div>
        </section>

        {/* Basic Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Components</h2>
          
          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button title="primary" type="button" variant="primary"/>
              <Button title="primary-outline" type="button" variant="primary-outline"/>
              <Button title="secondary" type="button" variant="secondary"/>
              <Button title="secondary-outline" type="button" variant="secondary-outline"/> 
            </div>
          </div>

          {/* Input Fields */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Input Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
              <InputField
                label="Text Input"
                placeholder="Enter text here"
                type="text"
              />
              <InputField
                label="Email Input"
                placeholder="Enter email"
                type="email"
              />
              <InputField
                label="Password Input"
                placeholder="Enter password"
                type="password"
              />
              <InputField
                label="Number Input"
                placeholder="Enter number"
                type="number"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Search Bar</h3>
            <div className="max-w-md">
              <SearchBar
                placeholder="Search..."
                onSearch={(query) => console.log("Search:", query)}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Date Picker</h3>
            <div className="max-w-md">
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholder="Select a date"
              />
            </div>
          </div>

          {/* Dropdown */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Dropdown</h3>
            <div className="max-w-md">
              <Dropdown
                options={dropdownOptions}
                value={dropdownValue}
                onChange={(value) => setDropdownValue(value)}
              />
            </div>
          </div>

          {/* Upload File Input */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">File Upload</h3>
            <div className="max-w-md">
              <UploadFileInput
                onFileUpload={(file) => console.log("Selected file:", file)}
                placeholder="Upload a file"
              />
            </div>
          </div>

          {/* Loading */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Loading</h3>
            <div className="flex items-center gap-4">
              <Loading />
              <span className="text-sm text-gray-600">Loading component</span>
            </div>
          </div>
        </section>

        {/* Layout Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Layout Components</h2>
          
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Header</h3>
            <div className="border rounded-lg overflow-hidden">
              <Header />
            </div>
          </div>
        </section>

        {/* Data Display Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Data Display Components</h2>
        </section>

        {/* Modal Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Modal Components</h2>
          
          <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Basic Modal
            </Button>
          </div>
        </section>

        {/* Utility Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Utility Components</h2>
          
          {/* Role Redirect Wrapper */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Role Redirect Wrapper</h3>
            <div className="p-4 bg-gray-100 rounded-lg">
              <RoleRedirectWrapper>
                <div className="text-sm text-gray-600">
                  This component wraps content with role-based redirect logic
                </div>
              </RoleRedirectWrapper>
            </div>
          </div>
        </section>

        {/* Modals */}
        <Modal 
          isModalOpen={isModalOpen} 
          closeModal={() => setIsModalOpen(false)}
          type="success"
          message="This is a basic modal component example."
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Delete confirmed");
            setIsDeleteModalOpen(false);
          }}
          title="Delete Item"
          message="Are you sure you want to delete this item?"
        />
      </div>
    </main>
  );
}
import { msg } from '@lit/localize';

export const translations = {
  appName: () => msg('Story App'),
  addStory: () => msg('Add Story'),
  description: () => msg('Description'),
  choosePhoto: () => msg('Choose Photo'),
  submit: () => msg('Submit'),
  cancel: () => msg('Cancel'),
  stories: () => msg('Stories'),
  emptyState: () => msg('No stories yet'),
  emptyStateDesc: () => msg('Be the first to share your story!'),
  successMessage: () => msg('Story added successfully!'),
  validationDescription: () => msg('Description must be at least 10 characters.'),
  validationPhoto: () => msg('Please select a photo for your story.'),
  validationDescriptionGood: () => msg('Looks good!'),
  validationPhotoGood: () => msg('Photo selected!'),
  profile: () => msg('Profile'),
  profileDeveloper: () => msg('Developer Profile'),
  home: () => msg('Home'),
};

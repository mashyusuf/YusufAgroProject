import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-6/12 my-8">
      <p className="text-teal-500 mb-2 text-md font-bold tracking-wide">
        {subHeading}
      </p>
      <h3 className="text-3xl font-bold uppercase border-y-2 py-2 bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 text-transparent bg-clip-text shadow-md">
        {heading}
      </h3>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};

export default SectionTitle;

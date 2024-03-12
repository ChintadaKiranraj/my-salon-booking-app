const ServiceCard = (props) => {
  const { service } = props;
  const { id, servicename, description, icons } = service;

  return (
    <>
      <li>
        <div className="service-card">
          <h3 className="card-title">{servicename}</h3>

          <p className="card-text">{description}</p>

          <button  className="card-btn">
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>
    </>
  );
};

export default ServiceCard;

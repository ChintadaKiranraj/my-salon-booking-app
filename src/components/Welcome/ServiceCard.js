import "./index.css";

const ServiceCard = (props) => {
  const { service } = props;
  const { id, servicename, description, icons } = service;

  return (
    <>
      <li>
        <div className="service-card">
          <h3 className="h3">
            <a href="#" className="card-title">
              {servicename}
            </a>
          </h3>

          <p className="card-text">{description}</p>

          <a href="#" className="card-btn" aria-label="more">
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      </li>
    </>
  );
};

export default ServiceCard;

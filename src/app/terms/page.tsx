export default function TermsPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-2xl shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className=" text-sm mb-8">Last Updated: December 10, 2024</p>
        <p className=" mb-4">
          Welcome to ptcgpocket.com. By accessing or using this website, you
          agree to the following terms:
        </p>
        <ul className="list-disc list-inside space-y-2 ">
          <li>
            <strong>Informational Use:</strong> This website is for
            informational purposes only. We do not guarantee the accuracy,
            completeness, or timeliness of the information provided.
          </li>
          <li>
            <strong>No Commercial Use:</strong> Content on this site, including
            card data and images, may not be used for commercial purposes
            without prior written permission.
          </li>
          <li>
            <strong>Intellectual Property:</strong> Pokémon and related
            trademarks are owned by their respective owners. This website is not
            affiliated with or endorsed by The Pokémon Company, Nintendo, or any
            associated entities.
          </li>
          <li>
            <strong>Changes to Content:</strong> We reserve the right to modify,
            update, or remove content at any time without notice.
          </li>
          <li>
            <strong>Disclaimer of Liability:</strong> We are not responsible for
            any errors, omissions, or damages resulting from the use of this
            site.
          </li>
        </ul>
        <p className=" text-gray-500 text-sm italic mt-4">
          By using this website, you acknowledge and agree to these terms. If
          you do not agree, please refrain from using this site.
        </p>
      </div>
    </div>
  );
}
